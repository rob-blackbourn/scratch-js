export function rtbLargestTriangleThreeBuckets(data, getX, getY, threshold) {
  if (threshold >= data.length || threshold === 0) {
    return data // Nothing to do
  }

  let sampled = [],
    sampled_index = 0

  // Bucket size. Leave room for start and end data points
  let every = (data.length - 2) / (threshold - 2)

  let a = 0, // Initially a is the first point in the triangle
    max_area_point,
    next_a

  sampled[sampled_index++] = data[a] // Always add the first point

  for (let i = 0; i < threshold - 2; ++i) {
    // Calculate point average for next bucket (containing c)
    let avg_x = 0,
      avg_y = 0,
      avg_range_start = Math.floor((i + 1) * every) + 1,
      avg_range_end = Math.floor((i + 2) * every) + 1
    avg_range_end = avg_range_end < data.length ? avg_range_end : data.length

    let avg_range_length = avg_range_end - avg_range_start

    for (; avg_range_start < avg_range_end; ++avg_range_start) {
      avg_x += getX(data[avg_range_start])
      avg_y += getY(data[avg_range_start])
    }

    avg_x /= avg_range_length
    avg_y /= avg_range_length

    // Get the range for this bucket
    let range_offs = Math.floor((i + 0) * every) + 1,
      range_to = Math.floor((i + 1) * every) + 1

    let max_area = -1

    for (
      const point_a_x = getX(data[a]), point_a_y = getY(data[a]);
      range_offs < range_to;
      ++range_offs
    ) {
      // Calculate triangle area over three buckets
      const area =
        Math.abs(
          (point_a_x - avg_x) * (getY(data[range_offs]) - point_a_y) -
            (point_a_x - getX(data[range_offs])) * (avg_y - point_a_y)
        ) * 0.5

      if (area > max_area) {
        max_area = area
        max_area_point = data[range_offs]
        next_a = range_offs // Next a is this b
      }
    }

    sampled[sampled_index++] = max_area_point // Pick this point from the bucket
    a = next_a // This a is the next a (chosen b)
  }

  sampled[sampled_index++] = data[data.length - 1] // Always add last

  return sampled
}
