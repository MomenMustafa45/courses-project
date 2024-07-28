import React from 'react'
import styles from "../styles/ControlPanel.module.css"

const Loading = (): React.JSX.Element => {
  return (
    <div className={styles.cp_loading}>
      <div className={styles.cp_spinner} />
    </div>
  )
}

export default Loading
