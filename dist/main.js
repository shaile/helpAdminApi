"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const express = require("express");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use('/uploads', express.static(path_1.join(__dirname, '..', 'uploads')));
    await app.listen(process.env.PORT || 3009);
}
bootstrap();
//# sourceMappingURL=main.js.map