<!-- @format -->

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
                    <Chart :type="chartType" :data="sampleData" :options="options" />
                    <Chart :type="chartType" :data="sampleData2" />
                </div>
            </div>

            <div class="p-4">
                <div class="card">
                    <DataTable
                        :value="sampleData.datasets"
                        :scrollable="true"
                        scrollHeight="400px"
                        :loading="loading">
                        <Column field="label" header="label" style="min-width: 200px"></Column>
                        <Column
                            field="total"
                            header="value"
                            style="min-width: 200px"></Column>
                    </DataTable>
                </div>
                <div class="card">
                    <DataTable
                        :value="sampleData2.datasets"
                        :scrollable="true"
                        scrollHeight="400px"
                        :loading="loading">
                        <Column field="label" header="label" style="min-width: 200px"></Column>
                        <Column
                            field="total"
                            header="value"
                            style="min-width: 200px"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
    <pre class="p-4">
        요약
        3. 차트가 어떤식으로 그려지는지 샘플을 이용해 구현하며 확인 (프라임 뷰 차트 추가)
        4. 표(데이터 테이블)이 어떤식으로 그려지는지 샘플을 이용해 구현하며 확인 (프라임뷰 DataTable, Column 추가)
        </pre>
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
            // 필드 샘플
            fields: ['name', 'number', 'date'],

            // 새롭게 그려질 차트에 대한 정보들
            title: '',
            chartType: 'bar',
            rowData: null,
            columnData: null,
            value: null,

            // 최종적으로 만들어질 차트 데이터들의 모습 (샘플))
            sampleData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [
                    {
                        label: 'Sales',
                        data: [12, 19, 3, 5, 2],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        total: 41
                    },
                ],
            },
            options: {
                title: {
                    display: true,
                    text: 'Monthly Sales',
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
            sampleData2: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        backgroundColor: '#2f4860',
                        borderColor: '#2f4860',
                        tension: 0.4,
                        total: 436
                    },
                    {
                        label: 'Second Dataset',
                        data: [28, 48, 40, 19, 86, 27, 90],
                        fill: false,
                        backgroundColor: '#00bb7e',
                        borderColor: '#00bb7e',
                        tension: 0.4,
                        total: 578
                    },
                ],
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
