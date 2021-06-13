import React, { useEffect, useState, useCallback, createContext } from 'react';

export const CategoryStoryContext = createContext()

export const CategotyStoryInfoProvider = props => {
    


    const storyInfo = {  }

    return (
        <CategoryStoryContext.Provider value={storyInfo}>
            {props.children}
        </CategoryStoryContext.Provider>
    )

}