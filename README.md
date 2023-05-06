# OPENAI 学习笔记


## 配置环境


### 代理配置 Clash or Surge

```
DOMAIN-SUFFIX,openai.com,PROXY
```

### 创建环境

- conda create -n openai python=3.11
- conda activate openai

### 依赖安装

- conda install -c conda-forge openai
- conda install -c conda-forge jupyterlab

### 配置 API KEY `~/.zshrc`

```
export OPENAI_API_KEY=sk-xxx
```


### 编辑器配置 VSCode

- https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter

## 运行