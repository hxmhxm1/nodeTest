### 安装mongodb数据库（若已安装，可忽略此步骤）默认已经安装Homebrew了

brew tap mongodb/brew
brew install mongodb-community
brew install mongosh  (这个是启动mongodb的连接工具)

### 启动mongodb数据库，这里选择连接的是本地数据库

1、启动
brew services start mongodb/brew/mongodb-community
2、连接
mongosh

### 停止mongodb数据库

brew services stop mongodb/brew/mongodb-community
