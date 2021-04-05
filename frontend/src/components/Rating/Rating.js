import React from 'react';

import './Rating.scss';

const Rating = ({ value, text, color }) => {
    return (
        <div className='rating' dir='ltr'>
            <span>
                <i 
                    style={{color: color}}
                    className={value >= 1
                        ? 'fas fa-star'
                        : value >= 0.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }    
                ></i>
            </span>
            <span>
                <i 
                    style={{color: color}}
                    className={value >= 2
                        ? 'fas fa-star'
                        : value >= 1.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }    
                ></i>
            </span>
            <span>
                <i 
                    style={{color: color}}
                    className={value >= 3
                        ? 'fas fa-star'
                        : value >= 2.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }    
                ></i>
            </span>
            <span>
                <i 
                    style={{color: color}}
                    className={value >= 4
                        ? 'fas fa-star'
                        : value >= 3.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }    
                ></i>
            </span>
            <span>
                <i 
                    style={{color: color}}
                    className={value >= 5
                        ? 'fas fa-star'
                        : value >= 4.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }    
                ></i>
            </span>

            <span className='rating rating__numReview'>
                <strong>{text && text}</strong> نظر خریدارن
            </span>
        </div>
    )
}

Rating.defaultProps = {
    color: '#ea2c62'
}

export default Rating;
