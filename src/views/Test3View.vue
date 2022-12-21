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
                    <Chart :type="chartType" :data="ChartDataset" />
                    <!-- <Chart :type="chartType" :data="sampleData2" /> -->
                </div>
            </div>

            <div class="p-4">
                <div class="card">
                    {{ ChartDataset.datasets }}
                    <DataTable
                        :value="ChartDataset.datasets"
                        :scrollable="true"
                        scrollHeight="400px"
                        :loading="loading">
                        <Column field="label" header="label" style="min-width: 200px"></Column>
                        <Column field="total" header="Total" style="min-width: 200px"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
    <pre class="p-4">
        요약
        5. 실제 데이터를 샘플 형식으로 변환하여 적용하면 끝.

        6. 차트: 열(필수) / 값(필수) / 행
        열(column) - y축 - 필수
        열은 라벨이 담긴다.

        값(value) - 필수
        해당 열에 대한 값이 담긴다

        행(row) - x축
        해당 열에 몇개가 함께 들어갈것인지.
        이 개수만큼 datasets에 오브젝트 형태로 추가한다

        7. 데이터 테이블: 열(필수) / 값(필수) / 행
        차트전용 값을 위해
        "열(column)"은 = ①datasets의 ②오브젝트에 ③label로 지정
        "값(value)"은 ①datasets의 data의 값을 모두 더한 값으로 ②total을 생성하여 지정
        "행(row)"은 무시한다
        </pre
    >
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
            // 더미 데이터
            ChartDataset: {
                labels: ['2022-12-16', '2022-12-12', '2022-12-09', '2022-12-07', '2022-12-01'],
                datasets: [
                    {
                        data: ['1', '3', '1', '3', '1'],
                        backgroundColor: '#ffba00',
                        label: '검토중',
                        total: 9,
                    },
                    {
                        data: ['0', '2', '0', '0', '1'],
                        backgroundColor: '#f57c00',
                        label: '재작업 요청',
                        total: 3,
                    },
                    {
                        data: ['0', '0', '3', '0', '0'],
                        backgroundColor: '#5d4037',
                        label: '재작업 완료',
                        total: 3,
                    },
                    {
                        data: ['2', '0', '0', '1', '1'],
                        backgroundColor: '#247aff',
                        label: '완료',
                        total: 4,
                    },
                ],
            },

            // 새롭게 그려질 차트에 대한 정보들
            title: '',
            chartType: 'bar',
            rowData: null,
            columnData: null,
            value: null,
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
