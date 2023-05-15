import {
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props
  const updatedLast7DaysResult = last7DaysVaccination.map(eachItem => ({
    vaccineDate: eachItem.vaccine_date,
    dose1: eachItem.dose_1,
    dose2: eachItem.dose_2,
  }))
  console.log(updatedLast7DaysResult)
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="firstChart">
      <h1 className="coverage-heading">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={updatedLast7DaysResult}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'grey',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
