<template>
    <!-- 왼쪽 필드 전체 -->
    <div class="p-4">
        <!-- 왼쪽 통계 이름 -->
        <div class="mb-4">
            <label for="field-title">통계 이름: </label>
            <input type="text" id="field-title" v-model="chartTitle" />
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
                    class="w-40 border border-collapse p-2 cursor-pointer">
                    {{ field }}
                </div>
            </div>

            <div>
                <!-- 중앙 선택된 통계 필드 -->
                <div>
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
    </div>

    <!-- 오른쪽 차트 -->
    <div>
        <div class="card">
            <h5>Linear Chart</h5>
            <Chart type="line" :data="lineData" :options="lineOptions" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chartTitle: '',
            chartDatas: [],

            chartName: [],
            chartType: [],

            fields: ['name', 'number', 'date'],
            rowData: null,
            columnData: null,
            value: null,

            dragItem: '',

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
.fieldBox {
    width: 200px;
    height: 200px;
    border: 1px solid black;
}
</style>
