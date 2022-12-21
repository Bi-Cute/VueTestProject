<template>
    <div style="width: 100%; display: flex">
        <!-- 왼쪽 필드 전체 -->
        <div style="padding: 1rem; flex: 0 0 40%; max-width: 40%">
            <!-- 왼쪽 통계 이름 -->
            <div class="fieldTitleWrap">
                <div>
                    <label for="field-title">통계 이름:</label>
                    <input
                        type="text"
                        id="field-title"
                        v-model="chartData.name"
                        style="margin-left: 0.5rem" />
                </div>
                <Button @click="saveCustomStatistics">저장</Button>
            </div>

            <div class="fieldSettingMenu">
                <!-- 왼쪽 필드 리스트 -->
                <div class="fieldsWrap">
                    <div
                        v-for="field in fields"
                        :key="field"
                        ref="draggable"
                        draggable="true"
                        @dragstart="handleDragStart"
                        @drag="handleDrag"
                        @dragend="handleDragEnd"
                        class="field"
                        :data-uuid="field.uuid"
                        :data-type="field.control_type">
                        {{ field.label }}
                    </div>
                </div>
                <!-- 중앙 선택된 통계 필드 -->
                <div class="container">
                    <h3 class="subTitle">통계에 추가할 필드를 아래 영역 사이에 끌어 놓으세요</h3>
                    <dl class="dataBoxWrap">
                        <div
                            class="dataBox"
                            data-box="column"
                            @drop="handleDrop"
                            @dragover="handleDragOver">
                            <dt class="dataBoxLabel" data-box="column">
                                <div>
                                    열 <span style="color: red; font-size: 0.5rem">(필수)</span>
                                </div>
                                <div
                                    v-if="columnLabel"
                                    @click="deleteLabel('column')"
                                    class="deleteLabel">
                                    &#215;
                                </div>
                            </dt>
                            <dd class="dataBoxValue" data-box="column">
                                {{ columnLabel }}
                            </dd>
                        </div>
                        <div
                            class="dataBox"
                            data-box="row"
                            @drop="handleDrop"
                            @dragover="handleDragOver">
                            <dt class="dataBoxLabel" data-box="row">
                                <div>행</div>
                                <div
                                    v-if="rowLabel"
                                    @click="deleteLabel('row')"
                                    class="deleteLabel">
                                    &#215;
                                </div>
                            </dt>
                            <dd class="dataBoxValue" data-box="row">
                                {{ rowLabel }}
                            </dd>
                        </div>
                        <div
                            class="dataBox"
                            data-box="value"
                            @drop="handleDrop"
                            @dragover="handleDragOver">
                            <dt class="dataBoxLabel" data-box="value">
                                <div>
                                    값 <span style="color: red; font-size: 0.5rem">(필수)</span>
                                </div>
                                <div
                                    v-if="valueLabel"
                                    @click="deleteLabel('value')"
                                    class="deleteLabel">
                                    &#215;
                                </div>
                            </dt>
                            <dd class="dataBoxValue" data-box="value">
                                {{ valueLabel }}
                            </dd>
                        </div>
                        <div>
                            <h3 class="subTitle">차트 모양 선택</h3>
                            <div style="display: grid; grid-template-columns: 1fr; gap: 0.25rem">
                                <Button @click="chartType = 'bar'">Bar Chart</Button>
                                <Button @click="chartType = 'doughnut'">doughnut Chart</Button>
                                <Button @click="chartType = 'pie'">pie Chart</Button>
                                <Button @click="chartType = 'line'">line Chart</Button>
                                <Button @click="chartType = 'polarArea'">Polar Area Chart</Button>
                                <Button @click="chartType = 'radar'">Radar Chart</Button>
                            </div>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
        <!-- 오른쪽 차트 -->
        <div class="w-6/12 flex flex-col">
            <div class="cardWrap">
                <div class="card">
                    <h5>미리보기</h5>
                    <Chart :type="chartType" :data="customStatistics" :options="options" />
                </div>
            </div>
            <div class="legendButtonsWrap">
                <span>범례 : </span>
                <Button @click="legendPosition('top')">위</Button>
                <Button @click="legendPosition('bottom')">아래</Button>
                <Button @click="legendPosition('left')">왼쪽</Button>
                <Button @click="legendPosition('right')">오른쪽</Button>
                <Button @click="legendDisplay()">{{
                    options.scales.y.display ? '값 표시 안함' : '값 표시'
                }}</Button>
            </div>
            <div class="cardWrap">
                <div class="card">
                    <DataTable
                        :value="customDataTable.datasets"
                        :scrollable="true"
                        scrollHeight="400px">
                        <Column
                            field="label"
                            :header="this.columnLabel"
                            style="min-width: 200px"></Column>
                        <Column
                            field="total"
                            :header="this.valueLabel"
                            style="min-width: 200px"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { BogoReq } from '@/services/http';
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ApiService from '@/services/api.service';
import Button from 'primevue/button';
import { FieldType } from '@/model/Types';

export default {
    components: {
        Chart,
        DataTable,
        Column,
        Button,
    },
    props: {
        project: Object,
    },
    data() {
        return {
            fields: [],

            chartType: 'bar',

            // 하나의 차트에 필요한 데이터
            chartData: {
                order: null,
                name: '',
                column: '',
                row: '',
                value: '',
                unique: 0,
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
                scales: {
                    y: {
                        display: true,
                    },
                },
            },

            columnLabel: null,
            rowLabel: null,
            valueLabel: null,

            customCharts: [],

            customStatistics: [],
            customDataTable: [],
        };
    },
    computed: {},
    mounted() {
        this.getProjectFields();
    },
    methods: {
        handleDragStart(event) {
            event.dataTransfer.setData('field', event.target.innerText);
            event.dataTransfer.setData('uuid', event.target.dataset.uuid);
            event.dataTransfer.setData('type', event.target.dataset.type);
        },
        handleDragOver(event) {
            event.preventDefault();
        },
        handleDrop(event) {
            event.preventDefault();
            const field = event.dataTransfer.getData('field');
            const uuid = event.dataTransfer.getData('uuid');
            const type = event.dataTransfer.getData('type');
            console.log('🚀 ~ handleDrop ~ field', field);
            const box = event.target.dataset.box;
            console.log('🚀 ~ handleDrop ~ box', box);
            if (box === 'row') {
                if (
                    type == FieldType.worker ||
                    type == FieldType.combo ||
                    type == FieldType.check
                ) {
                    this.rowLabel = field;
                    this.chartData.row = uuid;
                    this.customPreview();
                } else {
                    this.$ModalManager.alert(
                        `행에는 '작업자', '선택 상자', '체크 상자'만 추가할 수 있습니다`,
                    );
                    return;
                }
            } else if (box === 'column') {
                this.columnLabel = field;
                this.chartData.column = uuid;
                this.customPreview();
            } else if (box === 'value') {
                this.valueLabel = field;
                this.chartData.value = uuid;
                this.customPreview();
            }
        },
        getProjectFields() {
            ApiService.getProjectFields(this.project?.no).subscribe({
                next: fields => {
                    // console.log(fields);
                    this.fields = fields;
                },
            });
        },
        async saveCustomStatistics() {
            await new BogoReq(`/api/project/${this.project?.no}/statistics/custom`)
                .setData({
                    name: this.chartData.name,
                    column: this.chartData.column,
                    row: this.chartData.row,
                    value: this.chartData.value,
                })
                .post()
                .then(ret => {
                    console.log('saveCustomStatistics', ret);
                });
        },
        async customPreview() {
            let params = new URLSearchParams();
            params.append('col', this.chartData.column);
            params.append('val', this.chartData.value);
            params.append('row', this.chartData.row);
            console.log(params);
            if (this.columnLabel && this.valueLabel) {
                await new BogoReq(`/api/project/${this.project.no}/statistics/custom/preview`)
                    .setParams(params)
                    .get()
                    .then(ret => {
                        this.customCharts = ret;
                        this.makeCustomStatistics();
                    });
            } else {
                this.customStatistics = [];
                this.customDataTable = [];
            }
        },
        async makeCustomStatistics() {
            this.makeCustomChart(); // Ststistics
            this.makeCustomDataTable(); // DataTable
        },
        async makeCustomChart() {
            if (this.columnLabel && this.valueLabel && this.rowLabel) {
                const transformedData3 = {
                    labels: this.customCharts.data.map(item => item.col),
                    datasets: Object.keys(this.customCharts.data[0])
                        .filter(key => key !== 'col')
                        .map(key => ({
                            data: this.customCharts.data.map(item => item[key]),
                            label: key,
                            total: this.customCharts.data.reduce(
                                (acc, item) => acc + parseInt(item[key]),
                                0,
                            ),
                        })),
                };

                this.customStatistics = transformedData3;
                this.customDataTable = transformedData3;
            }

            if (this.columnLabel && this.valueLabel && !this.rowLabel) {
                const transformedData2 = {
                    labels: this.customCharts.data.map(item => item.col),
                    datasets: [
                        {
                            data: this.customCharts.data.map(item => item.val),
                            label: 'value',
                            total: this.customCharts.data.reduce(
                                (total, item) => total + parseInt(item.val),
                                0,
                            ),
                        },
                    ],
                };
                this.customStatistics = transformedData2;
            }
        },
        async makeCustomDataTable() {
            if (this.columnLabel && this.valueLabel && !this.rowLabel) {
                const transformedOBJ = this.customCharts.data.map(item => ({
                    data: [item.val],
                    label: item.col,
                    total: Number(item.val),
                }));

                this.customDataTable.datasets = transformedOBJ;
            }
        },
        deleteLabel(data) {
            if (data == 'column') {
                this.columnLabel = '';
                this.chartData.column = '';
                this.customPreview();
            }
            if (data == 'row') {
                this.rowLabel = '';
                this.chartData.row = '';
                this.customPreview();
            }
            if (data == 'value') {
                this.valueLabel = '';
                this.chartData.value = '';
                this.customPreview();
            }
        },
        legendPosition(value) {
            this.options.plugins.legend.position = `${value}`;
            this.customPreview();
        },
        legendDisplay() {
            if (this.options.scales.y.display) {
                this.options.scales.y.display = false;
            } else {
                this.options.scales.y.display = true;
            }
            this.customPreview();
        },
    },
};
</script>

<style scoped>
dd {
    margin: 0;
}
.fieldTitleWrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;
}
.cardWrap {
    padding: 1rem;
}
.card {
    background-color: var(--surface-card);
    padding: 1.5rem;
    color: var(--surface-900);
    margin-bottom: 1rem rem;
    border-radius: 12px;
    box-shadow: 0px 3px 5px rgb(0 0 0 / 2%), 0px 0px 2px rgb(0 0 0 / 5%),
        0px 1px 4px rgb(0 0 0 / 8%) !important;
}

.saveButton {
    display: inline-flex;
    align-items: center;
    border-radius: 0.375rem;
    border-width: 1px;
    border-color: transparent;
    background-color: rgb(79 70 229);
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgb(255 255 255);
    font-weight: 500;
    line-height: 1rem;
}
.saveButton:hover {
    background-color: rgb(67 56 202);
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.legendButtonsWrap {
    padding: 0.25rem 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.fieldSettingMenu {
    display: flex;
    gap: 1rem;
}
.fieldsWrap {
    border: 1px solid black;
    border-radius: 0.25rem;
    padding: 1rem;
}

.field {
    width: 10rem;
    border: 1px solid black;
    border-collapse: collapse;
    padding: 0.5rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    cursor: pointer;
}
.subTitle {
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;
    line-height: 1.5rem;
    color: rgb(17 24 39);
}
.dataBoxWrap {
    margin-top: 1.25rem;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.25rem;
}
.dataBox {
    overflow: hidden;
    border-radius: 0.5rem;
    background-color: rgb(255 255 255);
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 1.25rem;
    border: 1px solid black;
}
.dataBoxLabel {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: rgb(107 114 128);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.dataBoxValue {
    margin-top: 0.25rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: rgb(17 24 39);
}

.deleteLabel {
    color: red;
    width: 24px;
    height: 24px;
    text-align: center;
    cursor: pointer;
}
</style>
