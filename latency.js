const helpers = require('./helpers')

const sleep = (delay, message) => {
  return new Promise((resolve) => {
    // wait x time before resolving
    setTimeout(() => resolve(message), delay)
  })
}

const validTimeRange = (delay) => {
  const defaultOutOfRange = 1000
  if (delay) {
    if (delay < 1000) return defaultOutOfRange
    else if (delay > 4000) return defaultOutOfRange
    return delay
  }
  return defaultOutOfRange
}

const simulate = async (req, res, next) => {
  const delay = validTimeRange(helpers.toNumber(req.query.delay))
  const delaySecs = Math.floor(delay / 1000)
  const noun = delaySecs > 1 ? 'seconds' : 'second'
  try {
    const response = await sleep(delay, `Thanks for waiting ${delaySecs} ${noun}`)
    res.status(200).send(response)
  } catch (err) {
    res.status(404).json({
      message: '404, Nothing here!',
      error: true
    })
  }
}

module.exports = {
  simulate
}
