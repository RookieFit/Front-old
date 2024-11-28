import { useState } from 'react';

export const useDragPrevent = () => {
    const [isMouseDown, setIsMouseDown] = useState(false); // 마우스 클릭 상태 추적
    const [isDragging, setIsDragging] = useState(false); // 드래그 상태 추적

    // 마우스 눌렸을 때 상태 처리
    const handleMouseDown = () => {
        setIsMouseDown(true);
        setIsDragging(false); // 드래그 상태 초기화
    };

    // 마우스 떼었을 때 상태 처리
    const handleMouseUp = (onClick: () => void) => {
        // 텍스트가 드래그되어 있다면 클릭을 방지
        const selection = window.getSelection();
        const isTextSelected = selection && selection.toString().length > 0;

        if (!isTextSelected && !isDragging && isMouseDown) {
            onClick(); // 클릭 시 이동 처리
        }
        setIsMouseDown(false); // 상태 초기화
    };

    // 마우스 이동 시 드래그 상태로 변경
    const handleMouseMove = () => {
        if (isMouseDown) {
            setIsDragging(true);
        }
    };

    return {
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
    };
};
