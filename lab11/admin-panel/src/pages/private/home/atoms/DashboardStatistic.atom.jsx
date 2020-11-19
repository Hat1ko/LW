import React, { useState, useEffect } from 'react'
import { Card, CardHeader, Chart, Tabs } from '@/components'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRequestStatistic } from '@/store/statistic/actions'
import { tabsList } from '@/config/tabsStatisticConfig'

const getDays = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  return new Date(year, month, 0).getDate()
}

export const DashboardStatistic = ({ topIndent }) => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState({ type: 'week', filter: 'day' })

  const requests = useSelector((state) => state.statistic.requests)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      fetchRequestStatistic({
        interval: filter.type,
        filterBy: filter.filter,
      })
    )
  }, [dispatch, filter.filter, filter.type])

  useEffect(() => {
    if (requests) {
      let rData
      switch (filter.type) {
        case 'week':
          rData = new Array(7)
          for (let i = 0; i < rData.length; i++) rData[i] = 0
          requests.map((item) => {
            rData[item[filter.filter]] = item.amountofrequests
          })
          setData(rData)
          break
        case 'month':
          rData = new Array(getDays())
          for (let i = 0; i < rData.length; i++) {
            rData[i] = 0
          }
          requests.map((item) => {
            rData[item[filter.filter] - 1] = item.amountofrequests
          })
          setData(rData)
          break
        case 'year':
          rData = new Array(12)
          for (let i = 0; i < rData.length; i++) rData[i] = 0
          requests.map((item) => {
            rData[item[filter.filter] - 1] = item.amountofrequests
          })
          setData(rData)
          break
        default:
          break
      }
    }
  }, [filter.filter, filter.type, requests])

  const loadData = async ({ value: type, filter }) => {
    setFilter({ type, filter })
  }

  return (
    <Card topIndent={topIndent}>
      <CardHeader>Cтатистика колличества заявок</CardHeader>
      <Tabs
        topIndent={25}
        bottomIndent={50}
        value={filter.type}
        onChange={loadData}
        list={tabsList}
      />
      <Chart type={filter.type} data={data} />
    </Card>
  )
}
