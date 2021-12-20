/**
 * author: Michael McKenzie
 */

import React from "react";

const DAY_FORMAT: Intl.DateTimeFormatOptions = { day: "2-digit" };
const MONTH_FORMAT: Intl.DateTimeFormatOptions = { month: "short" };
const YEAR_FORMAT: Intl.DateTimeFormatOptions = { year: "numeric" };

type Props = { timestamp: Date };

function BlogDate({ timestamp }: Props) {
  // use HTML <TIME> element for better structure and a11y

  return (
    <time dateTime={timestamp.toISOString()}>
      {timestamp.toLocaleString("default", DAY_FORMAT)}{" "}
      {timestamp.toLocaleString("default", MONTH_FORMAT)}{" "}
      {timestamp.toLocaleString("default", YEAR_FORMAT)}
    </time>
  );
}

export default React.memo(BlogDate);
