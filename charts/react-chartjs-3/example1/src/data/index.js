import { DateTime } from 'luxon'
import { sleep } from '../utils'

import dornumDay from './dornum-24h'
import dornumAll from './dornum-all'
import emdenDay from './emden-24h'
import emdenAll from './emden-all'
import dunkerqueDay from './dunkerque-24h'
import dunkerqueAll from './dunkerque-all'
import zeebruggeDay from './zeebrugge-24h'
import zeebruggeAll from './zeebrugge-all'
import easingtonDay from './easington-24h'
import easingtonAll from './easington-all'
import stfergusDay from './stfergus-24h'
import stfergusAll from './stfergus-all'
import segalDay from './segal-24h'
import segalAll from './segal-all'
import otherDay from './other-24h'
import otherAll from './other-all'
import aggregatedEntryDay from './aggregated-entry-24h'
import aggregatedEntryAll from './aggregated-entry-all'
import aggregatedExitDay from './aggregated-exit-24h'
import aggregatedExitAll from './aggregated-exit-all'
import systemBalanceDay from './system-balance-24h'
import systemBalanceAll from './system-balance-all'

const flowData = {
  Dornum: { day: dornumDay, all: dornumAll },
  Emden: { day: emdenDay, all: emdenAll },
  Dunkerque: { day: dunkerqueDay, all: dunkerqueAll },
  Zeebrugge: { day: zeebruggeDay, all: zeebruggeAll },
  Easington: { day: easingtonDay, all: easingtonAll },
  'St. Fergus': { day: stfergusDay, all: stfergusAll },
  'Fields Delivering into SEGAL': { day: segalDay, all: segalAll },
  'Other Exit Flows': { day: otherDay, all: otherAll },
  'Aggregated Entry Flow': { day: aggregatedEntryDay, all: aggregatedEntryAll },
  'Aggregated Exit Flow': { day: aggregatedExitDay, all: aggregatedExitAll },
  'System Flow Balance': { day: systemBalanceDay, all: systemBalanceAll },
}

export default flowData

const NAMES = [
  'Dornum',
  'Emden',
  'Dunkerque',
  'Zeebrugge',
  'Easington',
  'St. Fergus',
  'Fields Delivering into SEGAL',
  'Other Exit Flows',
  'Aggregated Entry Flow',
  'Aggregated Exit Flow',
  'System Flow Balance',
]

export async function fetchNames() {
  await sleep(1)
  return NAMES
}

export async function fetchLast24h() {
  await sleep(1)
  let data = []
  for (const name of NAMES) {
    const series = flowData[name].day.data
    for (const point of series) {
      data.push({
        name,
        date: DateTime.fromMillis(point.x, { zone: 'utc' }).toJSDate(),
        value: point.y,
      })
    }
  }
  return data
}

export async function fetchLast24hByNames(names) {
  await sleep(1)
  let data = []
  for (const name of names) {
    const series = flowData[name].day.data
    for (const point of series) {
      data.push({
        name,
        date: DateTime.fromMillis(point.x, { zone: 'utc' }).toJSDate(),
        value: point.y,
      })
    }
  }
  return data
}
