import { useRef, useEffect } from 'react';


export function getSectionListData(data) {
  const sectionListData = [];

  data.forEach(item => {
    const categoryTitle = item.category.title;
    let section = sectionListData.find(section => section.title === categoryTitle);
    if (!section) {
      section = {
        title: categoryTitle,
        data: []
      };
      sectionListData.push(section);
    }
    section.data.push({
      id: item.id.toString(),
      title: item.title,
      price: item.price
    });
  });

  return sectionListData;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
