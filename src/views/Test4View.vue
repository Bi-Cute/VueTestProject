<template>
    <div class="container flex">
        <!-- 왼쪽 필드 전체 -->
        <div class="p-4 w-6/12">
            <!-- 왼쪽 통계 이름 -->
            <div class="flex justify-between mb-4">
                <div>
                    <label for="field-title">통계 이름:</label>
                    <input type="text" id="field-title" v-model="title" />
                </div>

                <button
                    type="button"
                    class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    저장
                </button>
            </div>

            <div class="flex gap-4">
                <!-- 왼쪽 필드 리스트 -->
                <div class="border rounded-sm p-4">
                    <div
                        v-for="field in fields"
                        ref="draggable"
                        draggable="true"
                        @dragstart="handleDragStart"
                        @drag="handleDrag"
                        @dragend="handleDragEnd"
                        class="w-40 border border-collapse p-2 my-1 cursor-pointer">
                        {{ field }}
                    </div>
                </div>

                <!-- 중앙 선택된 통계 필드 -->
                <div class="container">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        통계에 추가할 필드를 아래 영역 사이에 끌어 놓으세요
                    </h3>
                    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1">
                        <div
                            class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                            data-box="row"
                            @drop="handleDrop"
                            @dragover="handleDragOver">
                            <dt class="truncate text-sm font-medium text-gray-500" data-box="row">
                                행(row) - x축
                            </dt>
                            <dd
                                class="mt-1 text-3xl font-semibold tracking-tight text-gray-900 cursor-pointer"
                                data-box="row">
                                {{ rowData }}
                            </dd>
                        </div>
                        <div
                            class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                            data-box="column"
                            @drop="handleDrop"
                            @dragover="handleDragOver">
                            <dt
                                class="truncate text-sm font-medium text-gray-500"
                                data-box="column">
                                열(column) - y축
                            </dt>
                            <dd
                                class="mt-1 text-3xl font-semibold tracking-tight text-gray-900"
                                data-box="column">
                                {{ columnData }}
                            </dd>
                        </div>
                        <div
                            class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                            data-box="value"
                            @drop="handleDrop"
                            @dragover="handleDragOver">
                            <dt class="truncate text-sm font-medium text-gray-500" data-box="value">
                                값(value)
                            </dt>
                            <dd
                                class="mt-1 text-3xl font-semibold tracking-tight text-gray-900"
                                data-box="value">
                                {{ value }}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>

        <!-- 오른쪽 차트 -->
        <div class="w-6/12 flex flex-col">
            <div class="p-4">
                <div class="card">
                    <h5>Linear Chart</h5>
                    <Chart :type="chartType" :data="chartData3" :options="options" />
                    <!-- <Chart :type="chartType" :data="sampleData2" /> -->
                </div>
            </div>

            <div class="p-4">
                <div class="card">
                    <DataTable
                        :value="chartData3.datasets"
                        :scrollable="true"
                        scrollHeight="400px">
                        <Column field="label" header="label" style="min-width: 200px"></Column>
                        <Column field="total" header="Total" style="min-width: 200px"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
    <pre class="p-4">
        요약
        
        </pre
    >
</template>

<script>
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import zoomPlugin from 'chartjs-plugin-zoom';

// Chart.register(zoomPlugin);

export default {
    components: {
        Chart,
        DataTable,
        Column,
    },
    data() {
        return {
            // 필드 샘플
            fields: ['name', 'number', 'date'],

            // 새롭게 그려질 차트에 대한 정보들
            title: '',
            chartType: 'bar',
            rowData: null,
            columnData: null,
            value: null,

            chartData3: {
                labels: ['MIKU', 'ZENN'],
                datasets: [
                    { data: ['0', '1'], label: 'A', total: 1 },
                    { data: ['2', '3'], label: 'B', total: 5 },
                    { data: ['0', '1'], label: 'C', total: 1 },
                ],
            },

            options: {
                title: {
                    display: true,
                    text: 'Monthly Sales',
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
                scales: {
                    x: {
                        type: 'category',
                        min: 5,
                        max: 11,
                        ticks: {
                            minRotation: 0,
                            maxRotation: 0,
                            autoSkip: true,
                            autoSkipPadding: 3,
                        },
                    },
                },
            },
        };
    },
    methods: {
        handleDragStart(event) {
            event.dataTransfer.setData('field', event.target.innerText);
        },
        handleDrag(event) {
            // 드래그중 실행할 코드
        },
        handleDragEnd(event) {
            // 드래그 종료시 실행할 코드
        },
        handleDragOver(event) {
            event.preventDefault();
        },
        handleDrop(event) {
            event.preventDefault();
            const field = event.dataTransfer.getData('field');
            console.log('🚀 ~ handleDrop ~ field', field);
            const box = event.target.dataset.box;
            console.log('🚀 ~ handleDrop ~ box', box);
            if (box === 'row') {
                this.rowData = field;
            } else if (box === 'column') {
                this.columnData = field;
            } else if (box === 'value') {
                this.value = field;
            }
        },
    },
};
</script>

<style scoped>
.card {
    background-color: var(--surface-card);
    padding: 1.5rem;
    color: var(--surface-900);
    margin-bottom: 1rem rem;
    border-radius: 12px;
    box-shadow: 0px 3px 5px rgb(0 0 0 / 2%), 0px 0px 2px rgb(0 0 0 / 5%),
        0px 1px 4px rgb(0 0 0 / 8%) !important;
}
</style>
