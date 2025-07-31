import React, { useEffect } from 'react'

export default function GoogleReviewsWidget() {
  useEffect(() => {
    // Add the Elfsight platform script only once
    if (!document.getElementById('elfsight-platform-script')) {
      const script = document.createElement('script')
      script.id = 'elfsight-platform-script'
      script.src = "https://static.elfsight.com/platform/platform.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <div className="elfsight-app-dba017c0-634d-49f0-bd97-1486ad76c35c" data-elfsight-app-lazy></div>
    </div>
  )
}
