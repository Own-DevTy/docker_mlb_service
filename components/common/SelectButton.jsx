import styles from "@/styles/components/common/SelectButton.module.css";
import {motion} from "framer-motion";
import {FaBaseballBatBall} from "react-icons/fa6";
import {BiBaseball} from "react-icons/bi";

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 70
}

/**
 *
 * @param position useState 반환값의 Getter 함수를 삽입
 * @param selectPosition useState 반환값의 Setter 함수를 삽입
 * @returns {JSX.Element}
 * @constructor
 */
export default function SelectButton({position, selectPosition}){
    return (
        <div className={styles.selector} data-ison={position}
             onClick={() => selectPosition(!position)}>
            <motion.div className={styles.handle} layout transition={spring}>
                {position ? (<FaBaseballBatBall/>) : (<BiBaseball/>)}
            </motion.div>
        </div>
    )
}