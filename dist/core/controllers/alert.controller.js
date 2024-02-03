"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertController = void 0;
const common_1 = require("@nestjs/common");
const get_damage_summary_by_date_use_case_1 = require("../use-cases/get-damage-summary-by-date.use-case");
const summary_filters_dto_1 = require("../dtos/summary-filters.dto");
const swagger_1 = require("@nestjs/swagger");
const alerts_report_result_dto_1 = require("../dtos/alerts-report-result.dto");
let AlertController = class AlertController {
    constructor(getDamageSummaryByDateUseCase) {
        this.getDamageSummaryByDateUseCase = getDamageSummaryByDateUseCase;
    }
    async damageSummaryByDate(query) {
        const report = await this.getDamageSummaryByDateUseCase.execute(query.dateStart, query.dateEnd);
        return {
            data: report,
        };
    }
};
exports.AlertController = AlertController;
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: alerts_report_result_dto_1.AlertsReportResultDto }),
    (0, common_1.Get)('/damage-summary-by-date'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [summary_filters_dto_1.SummaryFiltersDto]),
    __metadata("design:returntype", Promise)
], AlertController.prototype, "damageSummaryByDate", null);
exports.AlertController = AlertController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [get_damage_summary_by_date_use_case_1.GetDamageSummaryByDateUseCase])
], AlertController);
//# sourceMappingURL=alert.controller.js.map