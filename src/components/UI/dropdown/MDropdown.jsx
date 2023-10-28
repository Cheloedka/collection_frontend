import {useState} from 'react';
import style from "./MDropdown.module.css"
import {useStyles} from "../../../hooks/useStyles";
import FilterPolygons from "../svg/FilterPolygons";

function MDropdown({options, className, defaultValue}) {

    const styles = useStyles(style.main, className)

    const [currentFilter, setCurrentFilter] = useState(defaultValue)

    return (
        <div className={styles}>
            <div className={style.select}>

                <span className={style.currentFilter}>
                    {currentFilter}
                    <FilterPolygons />
                </span>

                <div className={style.options}>
                    { options.map((o, index) =>
                            <div
                                className={style.option}
                                onClick={() => {
                                    o.onClick(o.type)
                                    setCurrentFilter(o.title)
                                }}
                                key={index}
                            >
                                <span className={style.currentFilter}>
                                    {o.title}
                                    <FilterPolygons />
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );

}

export default MDropdown;