// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import qs from "query-string";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("MMMM DD, YYYY");
};


export function parseTripData(jsonString: string): Trip | null {
  try {
    const data: Trip = JSON.parse(jsonString);

    return data;
  } catch (error) {
    console.error("Failed to parse trip data:", error);
    return null;
  }
}

export function getFirstWord(input: string = ""): string {
  return input.trim().split(/\s+/)[0] || "";
}

export const calculateTrendPercentage = (
  countOfThisMonth: number,
  countOfLastMonth: number
): TrendResult => {
  if (countOfLastMonth === 0) {
    return countOfThisMonth === 0
      ? { trend: "no change", percentage: 0 }
      : { trend: "increment", percentage: 100 };
  }

  const change = countOfThisMonth - countOfLastMonth;
  const percentage = Math.abs((change / countOfLastMonth) * 100);

  if (change > 0) {
    return { trend: "increment", percentage };
  } else if (change < 0) {
    return { trend: "decrement", percentage };
  } else {
    return { trend: "no change", percentage: 0 };
  }
};

export const formatKey = (key: keyof TripFormData) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

export function formUrlQuery({ params, key, value }) {
    const currentUrl = qs.parse(params)
  
    currentUrl[key] = value
  
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }

  export function removeKeysFromQuery({ params, keysToRemove }) {
    const currentUrl = qs.parse(params)
  
    keysToRemove.forEach(key => {
      delete currentUrl[key]
    })
  
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }