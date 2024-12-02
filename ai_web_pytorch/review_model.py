import torch
import re
from transformers import BertTokenizer, BertForSequenceClassification

class ReviewModel:
    def __init__(self, 
                 model_name: str = "bert-base-uncased", 
                 model_path: str = "saved_model.pth", 
                 model_labels: int = 5):
        """
        Args:
        model_name (str): BERT 모델 이름 (기본값: 'bert-base-uncased')
        model_path (str): 저장된 모델 가중치 경로 (기본값: 'model_weights.pt')
        model_labels (int): 출력 라벨의 개수 (기본값: 5)
        """
        self.tokenizer = BertTokenizer.from_pretrained(model_name)
        self.model = BertForSequenceClassification.from_pretrained(model_name, num_labels=model_labels)
        self.model.load_state_dict(torch.load(model_path))
        self.model.eval()
    
    @staticmethod
    def clean_text(text: str) -> str: # 텍스트 클린 함수 (손상된 문자 제거)
        return re.sub(r'[^\x00-\x7F]+', '', text)
    
    def predict(self, text: str) -> int:  #리뷰 텍스트로부터 점수 예측

        cleaned_text = self.clean_text(text)  # 텍스트 정리

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
