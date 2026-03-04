export function orderBy(order) {
  if (order.direction && order.direction == 'desc') {
    return `-${order.field}`
  } else if (order.direction && order.direction == 'asc') {
    return `${order.field}`
  }
  return ''
}
