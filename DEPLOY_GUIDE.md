# GitHub Pages 部署指南

本项目已配置好自动化部署流程。您只需要将代码推送到 GitHub 仓库，GitHub Actions 就会自动构建并发布网站。

## 部署步骤

1.  **推送代码**
    将本项目的所有文件（包括 `.github/workflows/deploy.yml`）推送到您的 GitHub 仓库 `heterogeneous-distributed-training.github.io` 的 `master` 或 `main` 分支。

2.  **配置 GitHub Pages**
    - 进入 GitHub 仓库页面。
    - 点击 **Settings** (设置) > **Pages** (页面)。
    - 在 **Build and deployment** (构建与部署) 部分：
        - **Source** 选择 **GitHub Actions**。
    - 保存设置。

3.  **等待部署**
    - 点击仓库上方的 **Actions** 标签页。
    - 您应该能看到一个名为 "Deploy to GitHub Pages" 的工作流正在运行。
    - 等待它显示绿色对勾（成功）。

4.  **访问网站**
    部署成功后，您的网站将在 `https://heterogeneous-distributed-training.github.io` 上线。

## 本地开发

如果您需要在本地修改和预览：

1.  安装依赖：
    ```bash
    npm install
    ```

2.  启动开发服务器：
    ```bash
    npm run dev
    ```

3.  构建生产版本：
    ```bash
    npm run build
    ```

## 常见问题

- **路由问题**：由于 GitHub Pages 是静态托管，直接访问深层链接（如 `/facts`）可能会导致 404。本项目已使用 Hash 路由或配置了 404 重定向来解决此问题（具体取决于您的具体需求，目前使用的是 Wouter 的内存/Hash 路由兼容模式）。
- **自定义域名**：如果您后续想绑定自定义域名，可以在 Settings > Pages > Custom domain 中设置。
