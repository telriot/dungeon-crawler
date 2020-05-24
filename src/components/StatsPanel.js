import React, { useContext } from "react"
import { CharacterContext } from "../contexts/characterContext"
import { MapContext } from "../contexts/mapContext"
import { isMobile } from "react-device-detect"
import { itemImg, pickUp, consumeItem } from "../helpers"
import styles from "./StatsPanel.module.scss"

function StatsPanel() {
  const { charState, charDispatch } = useContext(CharacterContext)
  const { state, dispatch } = useContext(MapContext)
  const {
    hp,
    maxHp,
    xp,
    level,
    weapons,
    items,
    name,
    isPlaying,
    isGameOver,
  } = charState

  const handleClick = (action) => () => {
    if (!isPlaying) return null

    console.log(action)

    if (action === "pick-up") {
      pickUp({ state, charState, dispatch, charDispatch })
      //if 1,2,3,4
    } else if (action === "item-1") {
      items[0] && consumeItem(items[0], 0, charDispatch)
    } else if (action === "item-2") {
      items[1] && consumeItem(items[1], 1, charDispatch)
    } else if (action === "item-3") {
      items[2] && consumeItem(items[2], 2, charDispatch)
    } else if (action === "item-4") {
      items[3] && consumeItem(items[3], 3, charDispatch)
    }
  }

  return isMobile ? (
    <div
      className={styles.mobileContainer}
      style={!isPlaying ? { opacity: "0.4" } : null}
    >
      <div className={styles.mobileWeapon}>
        {weapons[0] ? (
          <img className={styles.weaponImg} src={itemImg(weapons[0].name)} />
        ) : null}
      </div>
      <div className={styles.itemsMobile}>
        <button
          onClick={handleClick("pick-up")}
          className={styles.mobileButtonLg}
        >
          Pick Up
        </button>

        <button
          onClick={handleClick("item-1")}
          className={styles.mobileButton1}
        >
          {items[0] ? (
            <img className={styles.itemImg} src={itemImg(items[0].name)} />
          ) : (
            1
          )}
        </button>
        <button
          onClick={handleClick("item-2")}
          className={styles.mobileButton2}
        >
          {items[1] ? (
            <img className={styles.itemImg} src={itemImg(items[1].name)} />
          ) : (
            2
          )}
        </button>
        <button
          onClick={handleClick("item-3")}
          className={styles.mobileButton3}
        >
          {items[2] ? (
            <img className={styles.itemImg} src={itemImg(items[2].name)} />
          ) : (
            3
          )}
        </button>
        <button
          onClick={handleClick("item-4")}
          className={styles.mobileButton4}
        >
          {items[3] ? (
            <img className={styles.itemImg} src={itemImg(items[3].name)} />
          ) : (
            4
          )}
        </button>
      </div>
      {isPlaying && !isGameOver ? (
        <div className={styles.fixedHp}>
          <p>
            {hp} / {maxHp}
          </p>
          <p>Lv: {level}</p>
          <p>{xp} XP</p>
        </div>
      ) : null}
    </div>
  ) : (
    <div
      className={styles.container}
      style={!isPlaying ? { opacity: "0.4" } : null}
    >
      {isPlaying ? (
        <>
          <h4 className={styles.statsH4}>{name}'s stats</h4>
          <div className={styles.stats}>
            <p className={styles.text}>{`HP: ${hp}/${maxHp}`}</p>
            <p className={styles.text}>{`XP: ${xp}`}</p>
            <p className={styles.text}>{`Level: ${level}`}</p>
          </div>
          <div className={styles.equipment}>
            <div className={styles.weapons}>
              <h5 className={styles.statsH5}>Weapon</h5>
              <p className={styles.text}>
                {weapons[0] ? weapons[0].name : "none"}
              </p>
            </div>
            <div className={styles.items}>
              <h5 className={styles.statsH5}>Items </h5>
              {items[0]
                ? items.map((item, index) => (
                    <p key={`item-${index}`} className={styles.text}>
                      {index + 1}: {item.name}
                    </p>
                  ))
                : "none"}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default StatsPanel
