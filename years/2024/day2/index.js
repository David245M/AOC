function formatInput(input) {
  return input.split('\r\n').map((row) => row.split(' ').map(Number))
}

function checkReport(report) {
  const isIncreasing = report[1] > report[0]

  for(let i = 1; i < report.length; i++) {
    const diff = Math.abs(report[i] - report[i-1])
    if(diff > 3 || diff < 1) {
      return false
    }
    if (isIncreasing && report[i] < report[i-1]) {
      return false
    }
    if (!isIncreasing && report[i] > report[i-1]) {
      return false
    }
  }
  return true
}

export function part1(input) {
  const reports = formatInput(input)
  const safeReports = reports.filter(checkReport)

  return safeReports.length
}

export function part2(input) {
  const reports = formatInput(input)
  const safeWithDampener = reports.filter(report => {
    if (checkReport(report)) {
      return true
    }
  
    for(let i = 0; i < report.length; i++) {
      const newReport = [...report]
      newReport.splice(i,1)

      if (checkReport(newReport)) {
        return true
      }
    }
    return false
  })

  return safeWithDampener.length
}