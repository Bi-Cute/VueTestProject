<!-- @format -->

<template>
    <div class="container flex">
        <!-- 왼쪽 필드 전체 -->
        <div class="p-4 w-6/12">
            <!-- 왼쪽 통계 이름 -->
            <div class="flex justify-between mb-4">
                <div>
                    <label for="field-title">통계 이름:</label>
                    <input type="text" id="field-title" v-model="chartData.title" />
                </div>

                <button>저장</button>
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
                                열
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
                                행
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
                                값
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
                    <Chart :type="chartData.chartType" :data="lineData" :options="lineOptions" />
                </div>
            </div>

            <div class="p-4">
                <div class="card">
                    <DataTable
                        :value="lineData.datasets"
                        :scrollable="true"
                        scrollHeight="400px"
                        :loading="loading">
                        <Column field="label" header="label" style="min-width: 200px"></Column>
                        <Column
                            field="backgroundColor"
                            header="backgroundColor"
                            style="min-width: 200px"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
    components: {
        Chart,
        DataTable,
        Column,
    },
    data() {
        return {
            fields: ['name', 'number', 'date'],

            // 여러 차트가 객체 배열로 저장될 장소
            chartDatas: [],

            // 하나의 차트에 필요한 데이터
            chartData: {
                title: '',
                // chartType: 'line',
                chartType: 'bar',
                rowData: '',
                columnData: null,
                value: null,
            },

            rowData: null,
            columnData: null,
            value: null,

            lineData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        backgroundColor: '#2f4860',
                        borderColor: '#2f4860',
                        tension: 0.4,
                    },
                    {
                        label: 'Second Dataset',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        backgroundColor: '#00bb7e',
                        borderColor: '#00bb7e',
                        tension: 0.4,
                    },
                ],
            },
            lineOptions: null,
        };
    },
    computed: {},
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
