<template>
<div class="project_statistics_wrap">
  <!-- 기본 통계 -->
  <div class="inner-content">
    <div class="section-label-wrap">
      <div class="section-label">기본 통계</div>
    </div>

    <div class="statistics-box">
      <!-- 01. 차트 상단 -->
      <div class="statistics-box-top">
        <div class="project-name">{{project?.name}}</div>
        <div class="project-progress">
          <div v-if="project?.quantity != 1000000" class="progress-label">프로젝트 진행률 ({{baseStatistics?.project_progress?.percentage}}%)</div>
          <div v-if="project?.quantity != 1000000">
            <ProgressBar class="progress-bar" :value="progress" />
          </div>
          <div v-if="project?.quantity == 1000000">
            <div class="progress-label">{{ baseStatistics?.project_progress?.current }} 개 사이트 진행됨</div>
          </div>
        </div>
      </div>

      <!-- 02. 차트 하단 -->
      <div class="statistics-box-bottom" @click="onClickMember">
        <!-- 02-1. 좌측 멤버 현황 -->
        <div class="members-level">
          <div class="field-label-wrap">
            <div class="field-label">멤버 현황</div>
          </div>
          <div class="member-item-wrap">
            <div class="member-item">
              <div class="member-label">M</div>
              <div class="member-value"> : {{baseStatistics?.members_by_level.m}} 명</div>
            </div>
            <div class="member-item">
              <div class="member-label">PM</div>
              <div class="member-value"> : {{baseStatistics?.members_by_level.pm}} 명</div>
            </div>
            <div class="member-item">
              <div class="member-label">PL</div>
              <div class="member-value"> : {{baseStatistics?.members_by_level.pl}} 명</div>
            </div>
            <div class="member-item">
              <div class="member-label">FE</div>
              <div class="member-value"> : {{baseStatistics?.members_by_level.fe}} 명</div>
            </div>
            <div class="member-item">
              <div class="member-label">VI</div>
              <div class="member-value"> : {{baseStatistics?.members_by_level.vi}} 명</div>
            </div>
          </div>
        </div>

		<!-- 02-2. 중앙 Bar 차트 -->
		<div class="bar-chart-wrap">
			<Chart type="bar" :data="defaultChartBar" style="width: 100%; height: 100%;" />
		</div>

		<!-- 02-3. 오른쪽 Pie 차트 -->
		<div class="pie-chart-wrap">
			<Chart type="pie" :data="defaultChartPie" />
		</div>

      </div>
    </div>
  </div>
  <!-- // 기본 통계 -->

  <!-- 개인 통계 -->
  <div v-if="userStatistics">
    <div class="personal-label-wrap">
      <div class="section-label">개인 통계</div>
    </div>
    <div style="display: flex">
      <div class="statistics-box">

        <div class="statistics-box-bottom" style="cursor:initial">

          <div class="members-level">
            <div class="field-label-wrap user_item">
              <div class="field-label">{{selectedMember.name}}</div>
            </div>
            <div class="personal-item-wrap">
              <div class="personal-item">
                <div class="personal-label">권한 : </div>
                <div class="level-box">FE</div>
              </div>
              <div class="personal-item">
                <div class="personal-label">총 개수 : </div>
                <div class="personal-value">0</div>
              </div>
            </div>
            <div class="day_month_button_wrap">
              <div>
                <input id="daily" type="radio" v-model="type" :value="ChartType.daily" style="display: none;" />
                <label class="day_month_button" :class="{'active': type == ChartType.daily }" for="daily">일별</label>
              </div>
              <div>
                <input id="monthly" type="radio" v-model="type" :value="ChartType.monthly" style="display: none;" />
                <label class="day_month_button" :class="{'active': type == ChartType.monthly }" for="monthly">월별</label>
              </div>
            </div>
          </div>

                        <div class="bar-chart-wrap">
                            <div class="field-label-wrap">
                                <div v-if="type == ChartType.daily" class="field-label">
                                    일별 통계 (최근 5일)
                                </div>
                                <div v-if="type == ChartType.monthly" class="field-label">
                                    월별 통계 (최근 5달)
                                </div>
                            </div>
                                <Chart type="bar" :data="memberBarData" style="max-width: 600px; height: 280px" />
                        </div>

                        <div class="pie-chart-wrap">
                            <div class="field-label-wrap">
                                <div class="field-label">작업 처리 현황</div>
                            </div>
                            <Chart type="pie" :data="memberPieData" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="customStatistics" >
            <div v-for="(chart, index) in customStatistics" :key="index" style="padding: 1rem; border-radius: 0.5rem; margin-bottom:2rem; border: 1px solid black; ">
              <div style="display: flex; justify-content: space-between; margin-bottom:0.5rem;">
                <h2>{{ chart.title }}</h2>
                <div style="display: flex; gap:0.25rem;">
                  <Button @click="deleteCustomStatistics(chart.no)" label="삭제" style="background: gray" />
                </div>
              </div>
                <div style="display: flex; gap: 1rem;">
                    <div style="width: 100%;">
                        <Chart type="bar" :data="chart" />
                    </div>
                    <div class="p-4">
                        <div class="card">
                            <DataTable
                                :value="customDataTable[index].datasets"
                                :scrollable="true"
                                scrollHeight="400px">
                                <Column field="label" :header="chartHeader[index]?.rowName ? chartHeader[index]?.rowName : chartHeader[index]?.colName" style="min-width: 200px"></Column>
                                <Column
                                    field="total"
                                    :header="chartHeader[index]?.valName"
                                    style="min-width: 200px"></Column>
                            </DataTable>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <AddChart :project="project" />
    </div>

</template>

<script>
import apiService from '@/services/api.service';
import ProgressBar from 'primevue/progressbar';
import { CommonUtils } from '@/common-utils';
import { modalController } from '@ionic/vue';
import BogoMemberVue from '@/views/components/BogoMember.vue';
import AddChart from '@/views/components/AddChart.vue';

import { BogoReq } from '@/services/http';
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

const ChartType = {
    daily: 1,
    monthly: 2,
};

export default {
    components: {
        AddChart,
        ProgressBar,
        Chart,
        DataTable,
        Column,
        Button
    },
    data() {
        return {
            fields: [],
            baseStatistics: null,
            users: null,

            ChartType,
            type: ChartType.daily,
            selectedMember: null,
            userStatistics: null,

            defaultChartBar: {},

            customCharts: [], // 서버에서 받은 원형

            customStatistics: [],  // 차트용 데이터 변환

            customDataTable: [],  // 데이터 테이블용 데이터 변환
            chartHeader: [],  // 데이터 테이블용 라벨

        };
    },
    watch: {
    selectedMember() {
      apiService.getPersonalStatistics(this.project.no, this.selectedMember.no).subscribe(data => {
        this.userStatistics = data
      })
    }
  },
  computed: {
    progress() {
      return CommonUtils.getProgressValue(this.project?.work_count, this.project?.quantity)
    },
    barOptions() {
      return {
        
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            suggestedMax: 5
          }
        }
      }
    },
        defaultChartPie() {
            return this.getPieData(this.baseStatistics?.all?.processing_status);
        },
        memberPieData() {
      if(this.type == ChartType.monthly) {
        return this.getPieData(this.userStatistics?.monthly?.processing_status)
      } else {
        return this.getPieData(this.userStatistics?.daily?.processing_status)
      }
    },
        memberBarData() {
      if(this.type == ChartType.monthly) {
        return this.getBarData(this.userStatistics?.monthly?.statistics)
      } else {
        return this.getBarData(this.userStatistics?.daily?.statistics)
      }
    }
    },
    created() {
        this.initStatistics();
        this.getProjectFields();
        this.defaultChartInit();
        this.getCustomsStatistics();
    },
    methods: {
    initStatistics() {
      if (this.project) {
        apiService
          .getBaseStatistics(this.project.no)
          .subscribe((statistics) => {
            this.baseStatistics = statistics
          })
      }
    },
    getBarData(statistics) {
      function dataSet(label, bg) {
        return {
          data: [],
          backgroundColor: bg,
          label: label
        }
      }

      if(statistics) {
        const data = {
          labels: [],
          datasets: [
            dataSet('검토중', '#ffba00'),
            dataSet('재작업 요청', '#f57c00'),
            dataSet('재작업 완료', '#5d4037'),
            dataSet('완료', '#247aff'),
          ]
        }
        statistics.forEach((e) => {
          data.labels.push(e.date)
          
          data.datasets[0].data.push(e.under_review)
          data.datasets[1].data.push(e.rework_requested)
          data.datasets[2].data.push(e.rework_completion)
          data.datasets[3].data.push(e.completion)          
        })

        return data
      }

      return {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: []
          }
        ],
      }
    },
    getPieData(status) {   
      if(status) {
        return {
          labels: ['검토중', '재작업 요청', '재작업 완료', '완료'],
          datasets: [
            {
              data: [status.under_review, status.rework_requested, status.rework_completion, status.completion],
              backgroundColor: ['#ffba00', '#f57c00', '#5d4037', '#247aff'],
            },
          ],
        }
      }
      
      return {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: []
          }
        ],
      }
    },
    async onClickMember() {
      const modal = await modalController.create({
        component: BogoMemberVue,
        cssClass: 'project_member_modal',
        componentProps: {
          blockProfile: true,
          onSelect: (user) => {
            this.selectedMember = user
            modalController.dismiss()
          }
        }
      })
      await modal.present()
    },
        async defaultChartInit() {
            await this.getDefaultStatistics();
            this.makeDefaultStatistics();
        },
        async getDefaultStatistics() {
            await new BogoReq(`/api/project/${this.project.no}/statistics/default`)
                .get()
                .then(ret => {
                    this.defaultStatistics = ret.data;
                });
        },
        async makeDefaultStatistics() {
            const labels = [];
            const under_review = [];
            const rework_requested = [];
            const rework_completion = [];
            const completion = [];
            await this.defaultStatistics.daily.forEach(date => {
                labels.push(date.date);
                under_review.push(date.under_review);
                rework_requested.push(date.rework_requested);
                rework_completion.push(date.rework_completion);
                completion.push(date.completion);
            });
            const datasets = [];
            datasets.push(
                { data: under_review, backgroundColor: '#ffba00', label: '검토중' },
                { data: rework_requested, backgroundColor: '#f57c00', label: '재작업 요청' },
                { data: rework_completion, backgroundColor: '#5d4037', label: '재작업 완료' },
                { data: completion, backgroundColor: '#247aff', label: '완료' },
            );
            this.defaultChartBar.labels = labels;
            this.defaultChartBar.datasets = datasets;
        },
        async getCustomsStatistics() {
            await new BogoReq(`/api/project/${this.project.no}/statistics/customs`)
                .get()
                .then(ret => {
                  console.log('ret =>', ret)
                    this.customCharts = ret
                    this.makeCustomStatistics();
                });
        },
        async makeCustomStatistics() {
            this.makeCustomChart() // Ststistics 
            this.makeCustomDataTable() // DataTable
        },

        makeCustomChart(){
          this.customCharts.data.forEach((chart)=>{
            console.log("🚀 ~  ~ chart", chart);

            if (chart.column && chart.value && chart.row) {
                const transformedData3 = {
                    no: chart.no,
                    title: chart.name,
                    labels: chart.data.map(item => item.col),
                    datasets: Object.keys(chart.data[0])
                        .filter(key => key !== 'col')
                        .map(key => ({
                            data: chart.data.map(item => item[key]),
                            label: key,
                            total: chart.data.reduce((acc, item) => acc + parseInt(item[key]), 0),
                        })),
                };

                this.customStatistics.push(transformedData3)
                this.customDataTable.push(transformedData3);
                console.log("🚀 ~  ~ transformedData3", transformedData3);
            }

            if (chart.column && chart.value && !chart.row) {
              const transformedData4 = {
                    no: chart.no,
                    title: chart.name,
                    labels: chart.data.map(item => item.col),
                    datasets: Object.keys(chart.data[0])
                        .filter(key => key !== 'col')
                        .map(key => ({
                            data: chart.data.map(item => item[key]),
                            label: key,
                            total: chart.data.reduce((acc, item) => acc + parseInt(item[key]), 0),
                        })),
                };

                  this.customStatistics.push(transformedData4)
                console.log("🚀 ~  ~ transformedData", transformedData4);
            }
            })
        },
        makeCustomDataTable(){
          console.log("🚀 ~ this.customCharts.data", this.customCharts.data);
          this.customCharts.data.forEach((chart)=>{
            console.log("🚀 ~ this.customCharts.data.forEach ~ chart", chart);

            if (chart.column && chart.value && !chart.row) {
              const transformedData = {
                    no: chart.no,
                    title: chart.name,
                    labels: chart.data.map(item => item.col),
                    datasets: chart.data.map(item => {
                      return {
                        data: [item.val],
                        label: item.col,
                        total: parseInt(item.val)
                      }
                    })
                  };

                this.customDataTable.push(transformedData)
            }
                const chartData = {};
                
                this.fields.findIndex((field)=>{
                  if(chart.row == field.uuid) {
                    chartData.rowName = field.label
                  }
                  if (chart.column == field.uuid){
                    chartData.colName = field.label
                  }
                  if (chart.value == field.uuid) {
                    chartData.valName = field.label
                  }
                })
                let headerObject = {
                  rowName: chartData.rowName,
                  colName: chartData.colName,
                  valName: chartData.valName + ': 개수'
                };
                this.chartHeader.push(headerObject)
            })
        },
        async deleteCustomStatistics(custom_no){
          await new BogoReq(`/api/project/${this.project.no}/statistics/custom/${custom_no}`)
                .delete()
                .then(ret => {
                  console.log('ret =>', ret)
                });
        },
        getProjectFields() {
              apiService.getProjectFields(this.project?.no).subscribe({
                    next: fields => {
                        console.log(fields);
                        this.fields = fields;
                    },
                });
            },
    },
    props: {
        project: Object,
    },
};
</script>

<style lang="scss" scoped>
.project_statistics_wrap {
  width: 100%;
  padding: 1em 0.75em 0;
}

.inner-content {
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.section-label-wrap,
.personal-label-wrap {
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  .section-label {
    font-size: 20px;
    color: #333333;
    background: #bdd7ee;
    text-align: center;
    padding: 8px 20px;
    min-width: 160px;
    border: 1px solid #999999;
    border-radius: 4px;
  }
}

.statistics-box {
  width: 100%;
  display: flex;
  border: 1px solid #666666;
  border-radius: 0.5rem;
  padding: 1em 0.75em 3em;
  flex-direction: column;
  box-sizing: border-box;
  .statistics-box-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    box-sizing: border-box;
    place-content: center flex-start;
    gap: 1em;
    .project-name {
      font-size: 24px;
      color: #333333;
      text-align: center;
      flex: 1 1 0%;
      box-sizing: border-box;
    }
    .project-progress {
      box-sizing: border-box;
      max-width: 280px;
      min-width: 280px;
      display: flex;
      flex-direction: column;
      .progress-bar {
        display: block;
        overflow: hidden;
        position: relative;
        transition: opacity 250ms linear;
        border-radius: 15px;
        margin-bottom: 12px;
        background: #ddd;
        width: 100%;
        height: 15px;
        border-radius: 4px;
      }
      .progress-label {
        font-size: 16px;
        color: #333333;
        text-align: center;
        margin-bottom: 4px;
      }
    }
  }
  .statistics-box-bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    cursor: pointer;
    box-sizing: border-box;
    .members-level {
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      .field-label-wrap {
        margin-bottom: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        .field-label {
          font-size: 18px;
          color: #333333;
          background: #bdd7ee;
          text-align: center;
          padding: 4px 20px;
          min-width: 80px;
          border: 1px solid #999999;
          border-radius: 4px;
          margin-bottom: 20px;
        }
      }
    }
    .member-item-wrap {
      width: 90%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.5rem 2rem;
      margin: 0 auto;
      .member-item {
        flex: 0 0 20%;
        min-width: 100px;
        max-width: 20%;
        margin-bottom: 10px;
        box-sizing: border-box;
        display: flex;
        .member-label {
          flex: 0 0 40%;
          box-sizing: border-box;
          max-width: 40%;
          font-size: 18px;
          color: #555555;
          text-align: start;
        }
        .member-value {
          flex: 1 1 60%;
          max-width: 60%;
          box-sizing: border-box;
          font-size: 18px;
          color: #777777;
          text-align: start;
        }
      }
    }
  }
}

.bar-chart-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
}

.pie-chart-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
}

.day_month_button_wrap {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

::v-deep(.p-progressbar-value) {
  background: #f6469d;
}

.personal-label-wrap {
  margin-bottom: 30px;
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
}

.personal-item-wrap {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
        .personal-item {
        flex: 0 0 24%;
        max-width: 24%;
        margin-bottom: 10px;
        box-sizing: border-box;
        display: flex;
        .personal-label {
          margin-right: 4px;
          flex: 1 1 68px;
          box-sizing: border-box;
          max-width: 68px;
          min-width: 68px;
          font-size: 18px;
          color: #555555;
          text-align: end;
        }
        .level-box {
            color: white;
            text-align: center;
            font-size: 16px;
            background-color: #7b1fa2;
            flex: 1 1 0%;
            box-sizing: border-box;
            font-weight: 700;
            height: 18px;
            width: 60px;
            max-width: 60px;
            border-radius: 5px;
            padding: 0 0.5rem;
          }
      }
}

.level-box {
  color: white;
  text-align: center;
  font-size: 16px;
  background-color: #7b1fa2;
  flex: 1 1 0%;
  box-sizing: border-box;
  font-weight: 700;
  height: 18px;
  width: 32px;
  border-radius: 5px;
  padding: 0 4px;
}

.personal-value {
    text-align: center;
    font-size: 16px;
    flex: 1 1 0%;
    box-sizing: border-box;
    height: 18px;
    width: 32px;
    border-radius: 5px;
}

.day_month_button {
  width: 100%;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e2f0d9;
  border-radius: 5px;
  cursor: pointer;
  &.active {
    background-color: #a9d18e;
  }
}

.statistics-box:last-child {
  margin-bottom: 3rem
}

@media (min-width: 768px) {
  .statistics-box {
    border: 1px solid #666666;
    padding: 20px 40px;
    flex-direction: column;
    box-sizing: border-box;
    display: flex;
    .statistics-box-top {
      flex-direction: row;
      .project-progress {
        flex: 1 1 280px;
        margin-right: 40px;
      }
    }
    .statistics-box-bottom {
      flex-direction: row;
      justify-content: space-between;
      gap: 2rem;
      cursor: pointer;
      .members-level {
        display: flex;
        margin-right: 40px;
        flex: 1 1 120px;
        box-sizing: border-box;
        max-width: 120px;
        min-width: 120px;
        flex-direction: column;
        .field-label-wrap {
          margin-bottom: 20px;
        }
        .member-item-wrap {
          padding-left: 1em;
          .member-item {
            flex: 0 0 100%;
            max-width: 100%;
            .member-label {
              flex: 1 1 100%;
            }
          }
        }
      }
    }
  }
  .bar-chart-wrap {
    width: 100%;
    max-width: 40%;
  }
  .pie-chart-wrap {
    width: 100%;
    max-width: 30%;
  }
}

.chartWrapper {
    position: relative;
}

.chartWrapper > canvas {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events:none;
}

.chartAreaWrapper {
    width: 600px;
    overflow-x: scroll;
}
</style>
