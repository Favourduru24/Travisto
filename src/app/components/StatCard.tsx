import Image from "next/image"
import { calculateTrendPercentage } from "../lib/utils"

const StatCard = ({headerTitle, total, currentMonthCount, lastMonthCount}: StatsCard) => {

    const {trend, percentage} = calculateTrendPercentage(currentMonthCount, lastMonthCount)

    const isDecrement = trend === 'decrement'

  return (
    <article className='stats-card'>
        <h3 className="text-base font-medium">
            {headerTitle}
        </h3>

        <div className="content">
         <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-semibold">{total}</h2>
         <div className="flex items-center gap-2">
          <figure className="flex items-center gap-1">
             <Image src={`/assets/icons/${isDecrement ? 'arrow-down-red.svg' : 'arrow-up-green.svg'}`} alt="arrow" className="size-5" width={24} height={24}/>
             <figcaption className={`text-sm font-medium ${isDecrement ? 'text-red-500' : 'text-success-700'}`}>{Math.round(percentage)}%</figcaption>
          </figure>
          <p className="text-sm font-medium text-gray-100 truncate">vs last month</p>
         </div>
        </div>

         <Image src={`/assets/icons/${isDecrement ? 'decrement.svg' : 'increment.svg'}`} alt="trend graph" className="xl:w-32 w-full h-full md:h-32 xl:h-full" width={500} height={500}/>
         </div>
    </article>
  )
}

export default StatCard