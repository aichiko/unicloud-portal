// useDocumentTitle
import { useEffect } from 'react';

/**
 * 自定义 Hook 用于设置文档标题和描述
 * @param {string} title 
 * @param {string} description 
 */
export function useDocumentTitle(title, description) {
  useEffect(() => {
    // 设置新的标题和描述
    if (!title) {
      console.warn("useDocumentTitle: title is required");
      return;
    }
    if (typeof title !== 'string') {
      console.error("useDocumentTitle: title must be a string");
      return;
    }
    if (description && typeof description !== 'string') {
      console.error("useDocumentTitle: description must be a string");
      return;
    }
    const originalTitle = document.title;
    document.title = title
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const newMetaDescription = document.createElement('meta');
        newMetaDescription.name = 'description';
        newMetaDescription.content = description;
        document.head.appendChild(newMetaDescription);
      }
    }

    // 组件卸载时恢复原标题
    return () => {
      document.title = originalTitle;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', '');
      }
    };
  }, [title]);
}