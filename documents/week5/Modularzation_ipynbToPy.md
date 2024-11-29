
# 리뷰 모델 구현 가이드

## 1. Jupyter Notebook에서 모델 학습

`ReviewModel` 클래스를 정의하여 BERT 기반의 시퀀스 분류 모델을 PyTorch Lightning을 사용해 학습했습니다. 이 과정을 통해 리뷰 텍스트의 긍정/부정 점수를 예측하는 모델을 구현했습니다. 아래는 모델 학습 과정의 주요 단계입니다.

### 모델 정의

`ReviewModel` 클래스는 PyTorch Lightning의 `LightningModule`을 상속받아 모델 학습, 평가, 최적화 과정을 정의합니다.

```python
class ReviewModel(L.LightningModule):
    def __init__(self, model_name, lr=2e-5, num_labels=5):
        super().__init__()
        self.model = BertForSequenceClassification.from_pretrained(model_name, num_labels=num_labels)
        self.lr = lr
```

- **`model_name`**: 사용할 BERT 모델 이름. 예: `bert-base-uncased`.
- **`lr`**: 학습률(Learning Rate).
- **`num_labels`**: 분류할 라벨의 개수.

#### `forward` 메서드
```python
def forward(self, input_ids, attention_mask, labels=None):
    output = self.model(input_ids, attention_mask=attention_mask, labels=labels)
    return output
```
- 모델의 순전파(forward pass)를 정의하며, `input_ids`와 `attention_mask`를 입력으로 받아 결과를 반환합니다.

#### `training_step` 및 `validation_step`
```python
def training_step(self, batch, batch_idx):
    output = self.forward(batch['input_ids'], batch['attention_mask'], labels=batch['labels'])
    loss = output.loss
    self.log('train_loss', loss)
    return loss

def validation_step(self, batch, batch_idx):
    output = self.forward(batch['input_ids'], batch['attention_mask'], labels=batch['labels'])
    loss = output.loss
    self.log('val_loss', loss)
    return loss
```
- **`training_step`**: 학습 데이터 배치에서 손실(loss)을 계산.
- **`validation_step`**: 검증 데이터 배치에서 손실을 계산.

#### 옵티마이저 설정
```python
def configure_optimizers(self):
    optimizer = AdamW(self.parameters(), lr=self.lr)
    return optimizer
```
- AdamW 옵티마이저를 사용하여 가중치 업데이트를 수행합니다.

### 학습 설정 및 실행

```python
model = ReviewModel('bert-base-uncased', lr=2e-5)

cp_callback = ModelCheckpoint(
    monitor='val_loss',
    mode='min'
)
es_callback = EarlyStopping(
    monitor='val_loss',
    patience=3,
    mode='min'
)

trainer = L.Trainer(
    max_epochs=6,
    callbacks=[cp_callback, es_callback],
    accelerator='gpu',
    devices=1
)
trainer.fit(model, data_module)
```

- **`ModelCheckpoint`**: 검증 손실(`val_loss`)이 가장 낮은 지점에서 모델을 저장.
- **`EarlyStopping`**: 검증 손실이 `3`번의 에포크 동안 개선되지 않으면 학습을 조기 종료.
- **`accelerator`**: GPU를 사용하여 학습 속도를 최적화.

### 모델 저장

```python
torch.save(model.state_dict(), "saved_model.pth")
```
- 학습된 모델 가중치를 저장합니다.

---

## 2. 필요한 부분만 추출하여 모듈화

모델을 다양한 환경에서 쉽게 활용하기 위해, **토크나이저와 모델 초기화**, **텍스트 클리닝**, **예측 로직**을 주요 구성 요소로 추출했습니다.

---

## 3. 모듈화된 구현

### 클래스 정의 및 설명

```python
import torch
import re
from transformers import BertTokenizer, BertForSequenceClassification
```
- **`torch`**: PyTorch 라이브러리.
- **`re`**: 정규 표현식을 사용하여 텍스트를 정리.
- **`transformers`**: BERT 모델과 토크나이저를 가져오기 위해 사용.

```python
class ReviewModel:
    def __init__(self, 
                 model_name: str = "bert-base-uncased", 
                 model_path: str = "saved_model.pth", 
                 model_labels: int = 5):
        """
        Args:
        model_name (str): BERT 모델 이름 (기본값: 'bert-base-uncased')
        model_path (str): 저장된 모델 가중치 경로 (기본값: 'saved_model.pth')
        model_labels (int): 출력 라벨의 개수 (기본값: 5)
        """
        self.tokenizer = BertTokenizer.from_pretrained(model_name)
        self.model = BertForSequenceClassification.from_pretrained(model_name, num_labels=model_labels)
        self.model.load_state_dict(torch.load(model_path))
        self.model.eval()
```

- **`tokenizer`**: 텍스트를 BERT 입력 형식으로 변환.
- **`model`**: BERT 기반 분류 모델.
- **`model.load_state_dict`**: 저장된 모델 가중치를 불러옴.
- **`self.model.eval()`**: 평가 모드로 설정.

#### `clean_text` 메서드

```python
@staticmethod
def clean_text(text: str) -> str:
    """텍스트를 정리하여 비ASCII 문자 제거"""
    return re.sub(r'[^\x00-\x7F]+', '', text)
```
- 입력 텍스트에서 비ASCII 문자를 제거하여 정리.

#### `predict` 메서드

```python
def predict(self, text: str) -> int:
    """
    입력된 리뷰 텍스트에 대해 점수를 예측합니다.

    Args:
    text (str): 입력 리뷰 텍스트

    Returns:
    int: 예측된 점수
    """
    cleaned_text = self.clean_text(text)

    encoding = self.tokenizer.encode_plus(
        cleaned_text,
        add_special_tokens=True,
        max_length=128,
        padding='max_length',
        truncation=True,
        return_attention_mask=True,
        return_tensors='pt',
    )

    with torch.no_grad():
        input_ids = encoding['input_ids']
        attention_mask = encoding['attention_mask']
        output = self.model(input_ids=input_ids, attention_mask=attention_mask)
        logits = output.logits
        predicted_score = torch.argmax(logits, dim=1).item() + 1  # 0부터 시작하므로 +1

    return predicted_score
```

- **`encode_plus`**: 텍스트를 토큰화하고 모델 입력 형식으로 변환.
- **`torch.no_grad`**: 추론 단계에서 그래디언트 계산 비활성화.
- **`torch.argmax`**: 로짓(logit) 중 가장 높은 값을 가진 인덱스를 예측 점수로 반환.

---

## 사용 방법

### 모델 초기화

```python
model = ReviewModel(model_name="bert-base-uncased", model_path="saved_model.pth", model_labels=5)
```

### 리뷰 점수 예측

```python
text = "이 제품은 훌륭하고 제 기대에 완벽히 부합했습니다!"
predicted_score = model.predict(text)
print(f"예측된 점수: {predicted_score}")
```



## 요약

- Jupyter Notebook에서 BERT 기반 리뷰 분류 모델을 학습했습니다.
- 학습된 모델을 저장하고, 이를 재사용할 수 있도록 모듈화했습니다.
- 사용자는 간단한 입력 텍스트를 통해 리뷰 점수를 예측할 수 있습니다.

