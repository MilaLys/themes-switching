"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const theme_schema_1 = require("./theme.schema");
exports.ThemeProviders = [
    {
        provide: 'ThemeModelToken',
        useFactory: (connection) => connection.model('Theme', theme_schema_1.ThemeSchema),
        inject: ['DbConnectionToken']
    },
];
//# sourceMappingURL=theme.providers.js.map