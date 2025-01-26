import React from 'react'

export default function Page() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </Router>
  )
}
