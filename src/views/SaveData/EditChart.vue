<template>
    <div class="modalControllerWrap">
        <div
            style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem">
            <div style="display: flex; gap: 0.5rem; align-items: center">
                <h3 class="subTitle">차트 제목 변경:</h3>
                <input type="text" v-model="editChartTitle" style="height: 2rem" />
            </div>
            <div>
                <Button label="저장" @click="onSave" />
                <Button label="취소" class="p-button-outlined" @click="closeModal" />
            </div>
        </div>
        <div class="legendButtonsWrap">
            <h3 class="subTitle">범례</h3>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.25rem">
                <Button
                    :label="editOptions.plugins.legend.display ? '표시' : '표시 안함'"
                    @click="legendDisplay()"
                    :class="editOptions.plugins.legend.display ? null : 'p-button-danger'"
                    style="grid-row: 1/3" />
                <Button
                    class="checkButton"
                    label="오른쪽"
                    @click="legendPosition('right')"
                    :class="
                        editOptions.plugins.legend.display && selectedLegendPosition == 'right'
                            ? null
                            : 'p-button-secondary'
                    "
                    :icon="
                        editOptions.plugins.legend.display && selectedLegendPosition == 'right'
                            ? 'pi pi-check'
                            : null
                    "
                    iconPos="right" />
                <Button
                    class="checkButton"
                    label="위"
                    @click="legendPosition('top')"
                    :class="
                        editOptions.plugins.legend.display && selectedLegendPosition == 'top'
                            ? null
                            : 'p-button-secondary'
                    "
                    :icon="
                        editOptions.plugins.legend.display && selectedLegendPosition == 'top'
                            ? 'pi pi-check'
                            : null
                    "
                    iconPos="right" />
                <Button
                    class="checkButton"
                    label="아래"
                    @click="legendPosition('bottom')"
                    :class="
                        editOptions.plugins.legend.display && selectedLegendPosition == 'bottom'
                            ? null
                            : 'p-button-secondary'
                    "
                    :icon="
                        editOptions.plugins.legend.display && selectedLegendPosition == 'bottom'
                            ? 'pi pi-check'
                            : null
                    "
                    iconPos="right" />
                <Button
                    class="checkButton"
                    label="왼쪽"
                    @click="legendPosition('left')"
                    :class="
                        editOptions.plugins.legend.display && selectedLegendPosition == 'left'
                            ? null
                            : 'p-button-secondary'
                    "
                    :icon="
                        editOptions.plugins.legend.display && selectedLegendPosition == 'left'
                            ? 'pi pi-check'
                            : null
                    "
                    iconPos="right" />
            </div>
        </div>
        <div>
            <h3 class="subTitle">차트 모양 선택</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.25rem">
                <Button
                    class="checkButton"
                    label="세로 막대 차트"
                    @click="changeChartType('VerticalBar')"
                    :class="editChartType == 'VerticalBar' ? null : 'p-button-secondary'"
                    :icon="editChartType == 'VerticalBar' ? 'pi pi-check' : null"
                    iconPos="right" />
                <Button
                    class="checkButton"
                    label="가로 막대 차트"
                    @click="changeChartType('HorizontalBar')"
                    :class="editChartType == 'HorizontalBar' ? null : 'p-button-secondary'"
                    :icon="editChartType == 'HorizontalBar' ? 'pi pi-check' : null"
                    iconPos="right" />
                <Button
                    class="checkButton"
                    label="누적 막대 차트"
                    @click="changeChartType('StackedBar')"
                    :class="editChartType == 'StackedBar' ? null : 'p-button-secondary'"
                    :icon="editChartType == 'StackedBar' ? 'pi pi-check' : null"
                    iconPos="right" />
                <Button
                    class="checkButton"
                    label="라인 차트"
                    @click="changeChartType('line')"
                    :class="editChartType == 'line' ? null : 'p-button-secondary'"
                    :icon="editChartType == 'line' ? 'pi pi-check' : null"
                    iconPos="right" />
                <Button
                    class="checkButton"
                    label="도넛 차트"
                    @click="changeChartType('doughnut')"
                    :class="editChartType == 'doughnut' ? null : 'p-button-secondary'"
                    :icon="editChartType == 'doughnut' ? 'pi pi-check' : null"
                    iconPos="right" />
                <Button
                    class="checkButton"
                    label="파이 차트"
                    @click="changeChartType('pie')"
                    :class="editChartType == 'pie' ? null : 'p-button-secondary'"
                    :icon="editChartType == 'pie' ? 'pi pi-check' : null"
                    iconPos="right" />
            </div>
        </div>
    </div>
    <div style="width: 600px; height: 400px; padding: 0.5rem 7rem">
        <Chart
            :type="editChartType"
            :data="editCustomStatistics"
            :options="editOptions"
            :key="remakeChart" />
    </div>
</template>

<script>
import Chart from 'primevue/chart';
import Button from 'primevue/button';
import { modalController } from '@ionic/vue';

export default {
    components: {
        Chart,
        Button,
    },
    props: {
        chartType: String,
        customStatistics: Object,
        options: Object,
        onEditSave: Function,
    },
    data() {
        return {
            editChartTitle: '',

            editChartType: '',
            editCustomStatistics: [],
            editOptions: {},

            remakeChart: 1,

            VerticalBar: {
                indexAxis: 'x',
                plugins: {
                    title: {
                        display: true,
                        text: '',
                    },
                    legend: {
                        display: true,
                        position: 'right',
                    },
                },
            },

            HorizontalBar: {
                indexAxis: 'y',
                plugins: {
                    title: {
                        display: true,
                        text: '',
                    },
                    legend: {
                        display: true,
                        position: 'right',
                    },
                },
            },

            StackedBar: {
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: '',
                    },
                    legend: {
                        display: true,
                        position: 'right',
                    },
                },
            },
        };
    },
    computed: {
        selectedLegendPosition() {
            return this.editOptions.plugins.legend.position;
        },
    },
    created() {
        this.editChartTitle = JSON.parse(JSON.stringify(this.options.plugins.title.text));
        this.editChartType = JSON.parse(JSON.stringify(this.chartType));
        this.editCustomStatistics = JSON.parse(JSON.stringify(this.customStatistics));
        this.editOptions = JSON.parse(JSON.stringify(this.options));
        this.remakeChart++;
    },
    methods: {
        legendPosition(value) {
            this.editOptions.plugins.legend.position = `${value}`;
            this.remakeChart++;
        },
        legendDisplay() {
            if (this.editOptions.plugins.legend.display) {
                this.editOptions.plugins.legend.display = false;
                this.VerticalBar.plugins.legend.display = false;
                this.HorizontalBar.plugins.legend.display = false;
                this.StackedBar.plugins.legend.display = false;
            } else {
                this.editOptions.plugins.legend.display = true;
                this.VerticalBar.plugins.legend.display = true;
                this.HorizontalBar.plugins.legend.display = true;
                this.StackedBar.plugins.legend.display = true;
            }
            this.remakeChart++;
        },
        changeChartType(type) {
            if (type == 'VerticalBar') {
                this.editChartType = 'bar';
                this.editOptions = this.VerticalBar;
            }
            if (type == 'HorizontalBar') {
                this.editChartType = 'bar';
                this.editOptions = this.HorizontalBar;
            }
            if (type == 'StackedBar') {
                this.editChartType = 'bar';
                this.editOptions = this.StackedBar;
            }
            if (type == 'line') {
                this.editChartType = 'line';
                this.editOptions = this.VerticalBar;
            }
            if (type == 'doughnut') {
                this.editChartType = 'doughnut';
                this.editOptions = this.VerticalBar;
            }
            if (type == 'pie') {
                this.editChartType = 'pie';
                this.editOptions = this.VerticalBar;
            }

            this.remakeChart++;
            // this.editChartType = type;
            // this.remakeChart++;
        },
        onSave() {
            this.editOptions.plugins.title.text = this.editChartTitle;
            if (this.onEditSave) {
                this.onEditSave(this.editChartType, this.editCustomStatistics, this.editOptions);
            }
        },
        closeModal() {
            return modalController.dismiss(null, 'cancel');
        },
    },
};
</script>

<style lang="scss" scoped>
.modalControllerWrap {
    width: 100%;
    height: 100%;
    padding: 1rem 1rem 0;
}

.subTitle {
    margin: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;
    line-height: 1.5rem;
    color: rgb(17 24 39);
}
.checkButton {
    display: flex;
    justify-content: space-between;
}
::v-deep(.p-button-label) {
    flex: none;
}
</style>
