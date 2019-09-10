import { ChartDataPeriod, DetailViewTableRow } from "../../core/domain/company.model";
import { Component, Input, OnInit } from "@angular/core";
import * as fromWidgets from "@core/state/company/widgets";
import { getSelectedPeriod, getShowDetailWidget } from "@core/state/company/dashboard";
import { select, Store } from "@ngrx/store";
import { expandOutFromTop } from "@shared/animations/slide.animations";
import { Observable } from "rxjs";
import { ToggleDetailExpanded } from "@app/core/state/company/dashboard/company-dashboard-layout.actions";
import { WidgetTypeEnum } from "@app/core/state/company/dashboard/company-dashboard-layout.reducer";

@Component({
    selector: "sbp-company-detail-widget-container",
    template: `
        <sbp-expandable-panel (close)="onClose()" [visible]="isExpanded$ | async">
            <sbp-company-detail-widget-component
                [title]="name"
                [selectedPeriod]="selectedPeriod$ | async"
                [allLineChartData]="allLineChartData$ | async"
                [tableDataHeaders]="tableDataHeaders$ | async"
                [allTableData]="allTableData$ | async"
            ></sbp-company-detail-widget-component>
        </sbp-expandable-panel>
    `,
    styleUrls: ["./company-detail-widget.container.scss"],
    animations: [expandOutFromTop]
})
export class CompanyDetailWidgetContainer implements OnInit {
    public isExpanded$: Observable<boolean>;
    public selectedPeriod$: Observable<any>;
    public allLineChartData$: Observable<ChartDataPeriod[]>;
    public tableDataHeaders$: Observable<string[]>;
    public allTableData$: Observable<DetailViewTableRow[]>;

    @Input()
    public name: string;

    @Input()
    public type: string;

    /**
     * Used for kpi widgets
     */
    @Input()
    public id: string;

    constructor(private store$: Store<any>) {}

    public onClose(): void {
        switch (this.type) {
            case WidgetTypeEnum.REVENUE:
                this.store$.dispatch(new ToggleDetailExpanded({ type: WidgetTypeEnum.REVENUE }));
                break;
            case WidgetTypeEnum.EBITDA:
                this.store$.dispatch(new ToggleDetailExpanded({ type: WidgetTypeEnum.EBITDA }));
                break;
            case WidgetTypeEnum.CASH:
                this.store$.dispatch(new ToggleDetailExpanded({ type: WidgetTypeEnum.CASH }));
                break;
            case WidgetTypeEnum.KPI:
                this.store$.dispatch(new ToggleDetailExpanded({ type: WidgetTypeEnum.KPI, id: this.id }));
        }
    }
    public ngOnInit(): void {
        this.isExpanded$ = this.store$.pipe(select(getShowDetailWidget(name)));
        this.selectedPeriod$ = this.store$.pipe(select(getSelectedPeriod));
        this.allLineChartData$ = this.store$.pipe(select(fromWidgets.getAllLineChartGraphData(this.type, this.id)));
        // Table data
        this.tableDataHeaders$ = this.store$.pipe(select(fromWidgets.getTableDataHeaders(this.type, this.id)));
        this.allTableData$ = this.store$.pipe(select(fromWidgets.getAllTableData(this.type, this.id)));
    }
}
