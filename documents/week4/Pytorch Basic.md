# Pytorch Basic

# Tensor

텐서는 배열이나 행렬과 매우 유사한 특수한 자료구조이다. PyTorch에서는 텐서를 사용하여 모델의 입력과 출력, 그리고 모델의 매개변수들을 부호화한다. 텐서는 NumPy의 ndarray와 유사하다

```python
import torch
import numpy as np
```

## 텐서 초기화

### 데이터로 부터 직접 생성하기

```python
data =[[1,2],[3,4]]
x_data = torch.tensor(data)
```

### Numpy 배열로부터 생성하기

```python
np_array = np.array(data)
x_np = torch.from_numpy(np_array)
```

### 다른 텐서로부터 생성하기

```python
x_ones = torch.ones_like(x_data) # x_data의 속성을 유지한다
print(f"Ones Tensor: \\n{x_ones}\\n")

x_rand = torch.rand_like(x_data, dtype=torch.float) # x_data의 속성을 덮어쓴다
print(f"Random Tensor: \\n {x_rand} \\n")
```

![https://velog.velcdn.com/images/soheean1370/post/47820243-c82d-44fb-b730-718dce4f4590/image.png](https://velog.velcdn.com/images/soheean1370/post/47820243-c82d-44fb-b730-718dce4f4590/image.png)

### random 또는 constant 값 사용하기

shape은 텐서의 차원(dimension)을 나타내는 tuple로 아래 함수들에서는 출력 텐서의 차원을 결정한다

```python
shape = (2,3,)
rand_tensor = torch.rand(shape)
ones_tensor = torch.ones(shape)
zeros_tensor = torch.zeros(shape)

print(f"Random Tensor: \\n {rand_tensor}\\n")
print(f"Ones Tensor: \\n {ones_tensor}\\n")
print(f"Zeros Tensor: \\n {zeros_tensor}\\n")

```

![https://velog.velcdn.com/images/soheean1370/post/55e8156a-5cdc-4ba7-9c5a-65e36515a53c/image.png](https://velog.velcdn.com/images/soheean1370/post/55e8156a-5cdc-4ba7-9c5a-65e36515a53c/image.png)

## 텐서의 속성

텐서의 속성은 텐서의 모양, 자료형 및 어느 장치에 저장되는지를 나타낸다

```python
tensor = torch.rand(3,4)

print(f"Shape of tensor: {tensor.shape}")
print(f"Datatype of tensor: {tensor.dtype}")
print(f"Device tensor is stored on: {tensor.device}")

```

![https://velog.velcdn.com/images/soheean1370/post/17fbe2c8-435c-4fdd-97c5-ce3cfeeed8ed/image.png](https://velog.velcdn.com/images/soheean1370/post/17fbe2c8-435c-4fdd-97c5-ce3cfeeed8ed/image.png)

## 텐서 연산

각 연산들은 cpu보다 빠른 gpu에서 실행할 수 있다.(colab에서)
기본적으로 텐서는 cpu에 생성되고 .to 사용하면 gpu로 텐서를 명시적으로 이동할 수도 있다.

```python
if torch.cuda.is_avaible():
    tensor = tensor.to("cuda")
```

### numpy식의 표준 인덱싱과 슬라이싱

```python
tensor = torch.ones(4,4)
print(f"First row: {tensor[0]}")
print(f"First column: {tensor[:, 0]}")
print(f"Last column: {tensor[..., -1]}")
tensor[:,1] = 0
print(tensor)
```

![https://velog.velcdn.com/images/soheean1370/post/950bdfbb-c4ba-49c4-8933-bb83a7f12581/image.png](https://velog.velcdn.com/images/soheean1370/post/950bdfbb-c4ba-49c4-8933-bb83a7f12581/image.png)

```python
t1 = torch.cat([tensor, tensor, tensor], dim=1)
print(t1)
```

![https://velog.velcdn.com/images/soheean1370/post/54a13fac-ce0b-4216-8cd9-3f4bff286e32/image.png](https://velog.velcdn.com/images/soheean1370/post/54a13fac-ce0b-4216-8cd9-3f4bff286e32/image.png)

### 산술 연산

```python
# 두 텐서간의 행렬곱을 계산하자

y1 = tensor @ tensor.T
y2 = tensor.matmul(tensor.T)

y3 = torch.rand_like(y1)
torch.matmul(tensor, tensor.T, out=y3)

#요소별 곱을 계산하자
z1 = tensor * tensor
z2 = tensor.mul(tensor)
z3 = torch.rand_like(tensor)
torch.mul(tensor, tensor, out=z3)
```

### 단일 요소 텐서

텐서의 모든 값을 하나로 집계하여 요소가 하나인 텐서의 경우, item()을 사용하여 Python 숫자 값으로 변환할 수 있다

```python
#단일 요소
agg = tensor.sum()
agg_item= agg.item()
print(agg_item,type(agg_item))
```

![https://velog.velcdn.com/images/soheean1370/post/b98b65e0-057f-42ff-9e85-7d881bfd6ae9/image.png](https://velog.velcdn.com/images/soheean1370/post/b98b65e0-057f-42ff-9e85-7d881bfd6ae9/image.png)

### 바꿔치기 연산

연산 결과를 피연산자에 저장하는 연산을 바꿔치기 연산이라고 부른다.
예를들어 `x.copy_(y` , `x.t_()` 는 x를 저장한다

```python
# 바꿔치기 연산
print(f"{tensor} \\n")
tensor.add_(5)
print(tensor)
```

![https://velog.velcdn.com/images/soheean1370/post/b3491b1b-21d1-4fe5-b962-beba5fc4d77e/image.png](https://velog.velcdn.com/images/soheean1370/post/b3491b1b-21d1-4fe5-b962-beba5fc4d77e/image.png)

> 바꿔치기 연산은 메모리를 일부 절약하지만 기록이 즉시 삭제되어 도함수 계산에 문제가 발생할 수 있다
> 

## Numpy 변환

cpu 상의 텐서와 numpy 배열은 메모리 공간을 공유하기 때문에 하나를 변경하면 다른 하나도 변경된다

### 텐서를 numpy배열로 변환하기

```python
t= torch.ones(5)
print(f"t: {t}")
n= t.numpy()
print(f"n: {n}")
```

![https://velog.velcdn.com/images/soheean1370/post/8b6e4dd7-8674-414a-8f9e-bbf664fbc6d9/image.png](https://velog.velcdn.com/images/soheean1370/post/8b6e4dd7-8674-414a-8f9e-bbf664fbc6d9/image.png)

텐서의 변경 사항이 numpy 배열에 반영된다

```python
t.add_(1)
print(f"t: {t}")
print(f"n: {n}")
```

# Dataset and DataLoader

지저분한 데이터셋 코드를 더 나은 가독성과 모듈성을 위해 모델 학습 코드로부터 분리하는것이 이상적이다. PyTorch는 `torch.utils.data.DataLoader`와 `torch.utils.data.Dataset`의 두 가지 데이터 기본 요소를 제공하여 미리 준비해둔 pre-loaded 데이터셋 뿐만 아니라 가지고 있는 데이터를 사용할 수 있도록 한다.

- Dataset : 샘플과 정답을 저장
- DataLoader: 샘플에 쉽게 접근할 수 있도록 순회 간으한 객체로 감싼다

## 데이터셋 불러오기

TorchVision에서 Fahsion-MNIST 데이터셋을 불러와보자. 이미지 데이터셋으로 60,000개의 학습 예제와 10,000개의 테스트 예제로 이루어져 있다. 28x28 이미지와 10개의 분류 중 하나의 정답으로 구성

- `root` : 학습/테스트 데이터가 저장되는 경로
-`train` : 학습용 또는 테스트용 데이터셋 여부 지정
-`download=True`: root에 데이터가 없는 경우 인터넷에서 다운로드
-`transform` 과 `target_transform` : 특징과 정답변형을 지정

## 데이터셋을 순회하고 시각화하기

Dataset에 리스트처럼 직접 접근할 수 있는데 matplotlib을 사용하여 학습 데이터의 일부를 시각화해보자

```python
labels_map = {
    0: "T-Shirt",
    1: "Trouser",
    2: "Pullover",
    3: "Dress",
    4: "Coat",
    5: "Sandal",
    6: "Shirt",
    7: "Sneaker",
    8: "Bag",
    9: "Ankle Boot",
}
figure = plt.figure(figsize=(8, 8))
cols, rows = 3, 3
for i in range(1, cols * rows + 1):
    sample_idx = torch.randint(len(training_data), size=(1,)).item()
    img, label = training_data[sample_idx]
    figure.add_subplot(rows, cols, i)
    plt.title(labels_map[label])
    plt.axis("off")
    plt.imshow(img.squeeze(), cmap="gray")
plt.show()

```

![https://velog.velcdn.com/images/soheean1370/post/65317094-afa0-48dd-8133-fb5190fc8936/image.png](https://velog.velcdn.com/images/soheean1370/post/65317094-afa0-48dd-8133-fb5190fc8936/image.png)

## 파일에서 사용자 정의 데이터셋 만들기

사용자 정의 Dataset 클래스는 반드시 3개 함수를 구현해야 한다. FashionMNIST 이미지들은 img_dir 디렉토리에 저장되고, 정답은 annotations_file csv 파일에 별도로 저장된다

- **init** :
    - Dataset 객체가 생성될때 한 번만 실행된다. 여기서는 이미지와 주석파일이 포함된 디렉토리와 두가지 변형을 초기화 한다
- **len** :
    - 데이터셋의 샘플 개수를 반환한다
- **getitem** :
    - 주어진 인덱스 idx에 해당하는 샘플을 데이터셋에서 불러오고 반환한다.
    위치 식별 -> 이미지를 텐서로 변환 -> csv 데이터로부터 해당하는 정답 가져오기 -> 변형 함수들을 호출 -> 텐서 이미지와 라벨을 dict형으로 반환

## DataLoader로 학습용 데이터 준비하기

`Dataset`은 데이터셋의 특징을 가져오고 하나의 샘플에 정답을 지정하는 일을 한번에 한다. 모델을 학습할때, 일반적으로 샘플들을 미니배치로 전달하고, 매 에폭마다 데이터를 다시 섞어서 과적합을 막고, python의 멀티프로세싱을 사용해서 검색 속도를 높인다
`DataLoader` 는 간단한 API로 복잡한 과정들을 추상화하는 순회 가능한 객체이다

```python
from torch.utils.data import DataLoader

train_dataloader = DataLoader(training_data, batch_size=64, shuffle=True)
test_dataloader = DataLoader(test_data, batch_size=64, shuffle=True)

```

## DataLoader를 통해 순회하기

DataLoader 에 데이터셋을 불러온 뒤에는 필요에 따라 데이터셋을 순회(iterate)할 수 있다. 아래의 각 순회(iteration)는 (각각 batch_size=64 의 특징(feature)과 정답(label)을 포함하는) train_features 와 train_labels 의 묶음(batch)을 반환한다. shuffle=True 로 지정했으므로, 모든 배치를 순회한 뒤 데이터가 섞인다

```python

# 이미지와 정답(label)을 표시합니다.
train_features, train_labels = next(iter(train_dataloader))
print(f"Feature batch shape: {train_features.size()}")
print(f"Labels batch shape: {train_labels.size()}")
img = train_features[0].squeeze()
label = train_labels[0]
plt.imshow(img, cmap="gray")
plt.show()
print(f"Label: {label}")

```

![https://velog.velcdn.com/images/soheean1370/post/86f35cfc-8640-46d7-8e29-343ca904b5b4/image.png](https://velog.velcdn.com/images/soheean1370/post/86f35cfc-8640-46d7-8e29-343ca904b5b4/image.png)

![https://velog.velcdn.com/images/soheean1370/post/25dc8d60-b956-47fe-9479-8a0ab19ce332/image.png](https://velog.velcdn.com/images/soheean1370/post/25dc8d60-b956-47fe-9479-8a0ab19ce332/image.png)

# Transforms

데이터는 항상 머신러닝 알고리즘 학습에 바로 사용할 수 있는 형태로 제공되지 않는다. 따라서 데이터를 변형(transform)하여 학습에 적합한 형태로 만들어야 한다.

## TorchVision 데이터셋의 변형

모든 TorchVision 데이터셋은 두 개의 매개변수를 가진다:

- `transform` : 특징(feature)을 변경하기 위한 함수
- `target_transform` : 정답 (label)을 변경하기 위한 함수

이 매개변수들은 변형 로직을 갖는 호출 가능한 객체(callable)를 받는다

### FashionMNIST 데이터셋 예시

FashionMNIST 데이터셋의 특징은 PIL Image형식이고, 정답은 정수이다. 그래서 학습을 위해서는 형태를 변환해야 한다.

- feature : 정규화된 텐서
- label : one-hot 인코딩된 텐서

`ToTensor` 와 `Lambda` 변형을 사용하자

```python
import torch
from torchvision import datasets
from torchvision.transforms import ToTensor, Lambda

ds = datasets.FashionMNIST(
    root="data",
    train=True,
    download=True,
    transform=ToTensor(),
    target_transform=Lambda(lambda y: torch.zeros(10, dtype=torch.float).scatter_(0, torch.tensor(y), value=1))
)
```

### ToTensor()

- PIL Image나 NumPy ndarray를 FloatTensor로 변환
- 이미지 픽셀의 크기(intensity) 값을 [0., 1.] 범위로 정규화

### Lambda 변형

`Lambda` 변형은 사용자 정의 람다 함수를 적용한다. 위 예시에서는 정수를 원-핫 인코딩된 텐서로 변환하는 함수를 정의했다:

1. 크기가 10인 영(zero) 텐서를 생성 (클래스의 수가 10개이므로)
2. `scatter_` 함수를 호출하여 주어진 정답 `y`에 해당하는 인덱스에 `value=1`을 할당

```python
target_transform = Lambda(lambda y: torch.zeros(
    10, dtype=torch.float).scatter_(dim=0, index=torch.tensor(y), value=1))
```

이렇게 변형을 적용하면 FashionMNIST 데이터셋을 머신러닝 모델 학습에 적합한 형태로 준비할 수 있다.

# Neural Network

신경망은 데이터를 처리하는 계층이나 모듈로 이뤄져 있다. PyTorch의 torch.nn이 필요한 모든걸 제공한다. 그리고 모든 모듈은 nn.Modulel을 상속받는다

### 학습 장치 고르기

가능하면 GPU나 MPS 같은 하드웨어 가속기로 모델을 학습시키자.

```python
device = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
```

### 클래스 만들기

신경망 모델은 `nn.Module`을 상속받아 만든다. `__init__`에서 계층들을 초기화하고, `forward`에서 데이터 처리 과정을 구현한다

```python
class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(28*28, 512),
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 10),
        )

    def forward(self, x):
        x = self.flatten(x)
        logits = self.linear_relu_stack(x)
        return logits
```

### 모델 계층 (Layer)

- `nn.Flatten`: 2D 이미지를 1D 배열로 바꿈
    
    ```python
    flatten = nn.Flatten()
    flat_image = flatten(input_image)
    print(flat_image.size())
    # 출력: torch.Size([3, 784])
    ```
    
- `nn.Linear`: 입력에 선형 변환을 적용
    
    ```python
    layer1 = nn.Linear(in_features=28*28, out_features=20)
    hidden1 = layer1(flat_image)
    print(hidden1.size())
    # 출력: torch.Size([3, 20])
    ```
    
- `nn.ReLU`: 비선형 활성화 함수. 복잡한 패턴을 학습
    
    ```python
    print(f"Before ReLU: {hidden1}")
    hidden1 = nn.ReLU()(hidden1)
    print(f"After ReLU: {hidden1}")
    ```
    
- `nn.Sequential`: 여러 모듈을 순서대로 실행해주는 컨테이너
    
    ```python
    seq_modules = nn.Sequential(
        flatten,
        layer1,
        nn.ReLU(),
        nn.Linear(20, 10)
    )
    input_image = torch.rand(3, 28, 28)
    logits = seq_modules(input_image)
    ```
    
- `nn.Softmax`: 출력을 확률 분포로 변환
    
    ```python
    softmax = nn.Softmax(dim=1)
    pred_probab = softmax(logits)
    ```
    

### 모델 매개변수

`named_parameters()` 메소드로 모델의 모든 파라미터를 볼 수 있다. 각 파라미터의 크기와 값을 확인할 수 있다

# **Automatic Differentiation with `torch.autograd`**

PyTorch의 `torch.autograd`는 신경망 학습 시 가장 많이 사용되는 **역전파 알고리즘**을 통해 매개변수(가중치)의 변화도(gradient)를 자동으로 계산하는 엔진이다. 

이를 통해 매개변수의 최적화를 돕는다. 자동 미분은 연산 그래프(Computational graph)를 생성하여 매개변수에 대한 변화도를 계산하는데, 이는 손실 함수와 매개변수 간의 미분 값을 자동으로 구해주는 방식이다.

![image.png](./img/Pytorch_Basic_1.png)

### 1. 연산 그래프와 텐서

- 입력 텐서 `x`, `w`, `b`와 같은 매개변수는 신경망에서 학습해야 하는 변수이다. 이때, 변화도를 계산하고 싶다면 텐서를 정의할 때 **`requires_grad=True`** 옵션을 설정해야한다
- **연산 그래프**는 텐서에 적용되는 연산을 Function 클래스 객체로 표현한다. 각 연산은 그래프에서 노드로 연결되고, 순전파(forward pass)와 역전파(backward pass)를 계산한다. 예를 들어, `z = torch.matmul(x, w) + b`와 같은 연산에서, `z.grad_fn`에는 그 연산의 역전파 함수가 저장된다.

```python
print(f"Gradient function for z = {z.grad_fn}")
print(f"Gradient function for loss = {loss.grad_fn}")
```

### 2. 변화도 계산하기

- 신경망 학습의 핵심은 손실 함수의 변화도를 계산하여 매개변수를 업데이트하는 것이다. `loss.backward()`를 호출하면 손실 함수에 대한 매개변수의 변화도(즉, `∂loss/∂w`, `∂loss/∂b`)가 계산된. 이후, `w.grad`, `b.grad`에서 계산된 변화도를 확인할 수 있다.

```python
loss.backward()
print(w.grad)
print(b.grad)
```

변화도는 기본적으로 누적(accumulate)되므로, 여러 번의 backward 호출 전에 변화도를 초기화해야 한다. 그래디언트를 초기화하지 않으면 이전 변화도 값이 계속 누적되어 잘못된 결과를 얻을 수 있다.

### 3. 변화도 추적 멈추기

학습을 완료한 후에는 연산 추적이 필요 없을 수 있다. 특히 순전파 연산만 필요할 때 **성능 향상**을 위해 변화도 추적을 중단할 수 있다. 이를 위해서는 `torch.no_grad()`나 텐서의 `detach()` 메서드를 사용하여 변화도 계산을 멈출 수 있다.

```python
with torch.no_grad():
    z = torch.matmul(x, w) + b
```

이 방법은 주로 **모델 추론 단계**에서 사용되며, 불필요한 메모리 사용을 줄이고 연산 성능을 높여준다.

### 4. 연산 그래프 동작

PyTorch의 연산 그래프는 동적(Dynamic으로 구성된다. 이는 매번 순전파 단계가 실행될 때마다 새로운 그래프가 생성된다는 것을 의미한다. 덕분에, 조건문이나 반복문과 같은 **흐름 제어(control flow)** 구조에서도 자유롭게 사용할 수 있다.

### 5. 야코비안 곱 (Jacobian Product)

대부분의 경우 손실 함수는 스칼라 값이지만, 출력이 다차원 텐서일 때는 **야코비안 행렬**을 이용한 계산이 필요하다. PyTorch는 이때 야코비안 곱(Jacobian Product)을 계산하는데, 이는 출력 텐서의 변화도를 효율적으로 구하기 위함이다.

```python
out.backward(torch.ones_like(out), retain_graph=True)
```

여러 번 `backward`를 호출할 때는 `retain_graph=True` 옵션을 통해 그래프를 유지하고, 필요에 따라 그래디언트를 수동으로 초기화할 수 있다.

```python
inp.grad.zero_()
```

# **Optimizing Model Parameters**

### **모델 매개변수 최적화**

이제 데이터에 맞춰 모델을 학습하고, 검증 및 테스트할 차례이다. 이 과정은 여러 반복 단계를 거치며, 각 단계에서 모델은 추측을 하고, 손실을 계산한 후 경사하강법을 사용해 매개변수를 최적화한다.

### **기본 코드**

FashionMNIST 데이터를 로드하고, `NeuralNetwork` 클래스를 정의하여 신경망 모델을 생성한다.

```python
import torch
from torch import nn
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

training_data = datasets.FashionMNIST(
    root="data", train=True, download=True, transform=transforms.ToTensor()
)
test_data = datasets.FashionMNIST(
    root="data", train=False, download=True, transform=transforms.ToTensor()
)
train_dataloader = DataLoader(training_data, batch_size=64)
test_dataloader = DataLoader(test_data, batch_size=64)

class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(28*28, 512),
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 10),
        )
    def forward(self, x):
        x = self.flatten(x)
        return self.linear_relu_stack(x)
model = NeuralNetwork()

```

### **하이퍼파라미터**

모델 학습에 필요한 조절 가능한 매개변수이다:

- **에폭(epoch)**: 데이터셋을 반복하는 횟수
- **배치 크기(batch size)**: 매개변수 갱신 전 처리할 샘플 수
- **학습률(learning rate)**: 매개변수 업데이트 비율

```python
learning_rate = 1e-3
batch_size = 64
epochs = 5
```

### **최적화 단계 (Optimization Loop)**

최적화 단계는 **학습 단계**와 **검증 단계**로 나뉜다.

1. **손실 함수**: 예측과 실제 값의 차이를 측정하는 함수로, `nn.CrossEntropyLoss`를 사용한다
    
    ```python
    python
    Copy code
    loss_fn = nn.CrossEntropyLoss()
    
    ```
    
2. **옵티마이저(Optimizer)**: 경사하강법을 통해 모델 매개변수를 조정한다. 여기서는 `SGD`를 사용한다.
    
    ```python
    optimizer = torch.optim.SGD(model.parameters(), lr=learning_rate)
    ```
    
3. **학습 루프**:
    - `optimizer.zero_grad()`: 변화도를 초기화
    - `loss.backward()`: 손실의 변화도를 계산
    - `optimizer.step()`: 매개변수를 업데이트

# **Save and Load the Model**

PyTorch에서는 학습된 모델을 저장하고 불러오는 기능을 제공한다. 이는 추후 모델 재학습 없이 예측에 활용할 수 있도록 함.

### 1. **모델 가중치 저장하기**

모델의 학습된 매개변수는 `state_dict`에 저장된다. 이를 `torch.save`로 파일에 저장할 수 있다.

```python
import torch
import torchvision.models as models

# VGG16 모델 가중치 저장
model = models.vgg16(weights='IMAGENET1K_V1')
torch.save(model.state_dict(), 'model_weights.pth')
```

### 2. **모델 가중치 불러오기**

저장한 가중치를 불러오려면 동일한 모델을 생성한 후 `load_state_dict()`로 가중치를 불러온다.

```python
# 동일한 VGG16 모델 생성
model = models.vgg16()
model.load_state_dict(torch.load('model_weights.pth'))
model.eval()  # 모델을 평가 모드로 설정
```

### 3. **모델 전체 저장하기**

모델의 구조와 가중치를 함께 저장하려면 `torch.save`로 모델 자체를 저장한다.

```python
# 모델과 구조를 함께 저장
torch.save(model, 'model.pth')

# 모델 불러오기
model = torch.load('model.pth')
```

### 참고사항

- **`model.eval()`**: 추론(inference) 전에 호출하여 드롭아웃과 배치 정규화가 올바르게 동작하도록 설정.
- **모델 저장 방식**: 모델 구조와 함께 저장하면 클래스 정의가 필요하며, `pickle`을 사용.

**작성 - 안소희**