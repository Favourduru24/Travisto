"use client"

import { formUrlQuery } from "../lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

const Pagination = ({ page, totalPages, urlParamName }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (pageValue: number) => {
    const newUrl = formUrlQuery({
      params: searchParams?.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    })
    router.push(newUrl, { scroll: false })
  }

  const onClick = (btnType: "next" | "prev") => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1
    goToPage(pageValue)
  }

  return (
    <div className="flex items-center gap-2 my-5 justify-between">
      {/* Prev button */}
      <button
        className="w-28 bg-white text-dark-100 h-10 shadow-sm rounded-sm"
        onClick={() => onClick("prev")}
        disabled={Number(page) <= 1}
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`w-10 h-10 rounded-sm border shadow-sm cursor-pointer ${
              Number(page) === p
                ? "bg-primary-100 text-white font-semibold"
                : "bg-white text-dark-100 border-[#4B4D4F]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Next button */}
      <button
        className="w-28 bg-white text-dark-100 h-10 shadow-sm rounded-sm"
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
