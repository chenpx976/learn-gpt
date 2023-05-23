# 增加新模块

```
git submodule add --depth 1 https://github.com/hwchase17/langchain.git

```

# 拉取模块

```
git submodule init
git submodule update

```

# 更新模块

```
git submodule update --remote --merge

```

# 删除模块

```
git submodule deinit -f langchain
git rm -f langchain
rm -rf .git/modules/langchain

```

# 重置模块

```
git submodule update --init --recursive

```
