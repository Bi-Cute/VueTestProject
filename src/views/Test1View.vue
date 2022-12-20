<template>
    <div class="container p-4">
        <div class="flex justify-between mb-4">
            <div>
                <label for="field-title">통계 이름: </label>
                <input type="text" id="field-title" v-model="chartTitle" />
            </div>

            <button
                type="button"
                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                저장
            </button>
        </div>

        <div class="flex gap-4">
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

            <div class="w-full">
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
                        <dt class="truncate text-sm font-medium text-gray-500" data-box="column">
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
    <!-- Memo -->
    <pre class="p-4">
        요약
        1. 필드 데이터를 배열(fields)로 만든 후 v-for를 이용해서 필드 개수만큼 박스를 생성
        2. 드래그 & 드롭 이벤트를 이용해서 선택한 필드 데이터를 row, col, val의 값으로 지정
        </pre>
</template>

<script>
export default {
    data() {
        return {
            chartTitle: '',

            fields: ['name', 'number', 'date'],
            rowData: null,
            columnData: null,
            value: null,
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
