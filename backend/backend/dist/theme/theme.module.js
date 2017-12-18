"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const theme_controller_1 = require("./theme.controller");
const theme_service_1 = require("./theme.service");
const theme_providers_1 = require("./theme.providers");
const db_module_1 = require("../database/db.module");
let ThemeModule = class ThemeModule {
};
ThemeModule = __decorate([
    common_1.Module({
        modules: [db_module_1.DatabaseModule],
        controllers: [theme_controller_1.ThemeController],
        components: [theme_service_1.ThemeService, ...theme_providers_1.ThemeProviders],
    })
], ThemeModule);
exports.ThemeModule = ThemeModule;
//# sourceMappingURL=theme.module.js.map