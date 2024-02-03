"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertRepositoryMock = void 0;
const common_1 = require("@nestjs/common");
const success_alert_mock_1 = require("../values/success-alert.mock");
let AlertRepositoryMock = class AlertRepositoryMock {
    async findAllByDate(dateStart, dateEnd) {
        return success_alert_mock_1.successAlertMock.filter((alert) => alert.date >= dateStart && alert.date <= dateEnd);
    }
};
exports.AlertRepositoryMock = AlertRepositoryMock;
exports.AlertRepositoryMock = AlertRepositoryMock = __decorate([
    (0, common_1.Injectable)()
], AlertRepositoryMock);
//# sourceMappingURL=alert-repository.mock.js.map