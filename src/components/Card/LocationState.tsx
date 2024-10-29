import React, { useState } from 'react';  
  
const DropdownState = () => {  
  const [isOpen, setIsOpen] = useState(false); // 控制下拉框的显示状态  
  const [selectedValues, setSelectedValues] = useState([]); // 存储选中的值  
  
  const toggleDropdown = () => {  
    setIsOpen(!isOpen); // 切换下拉框的显示状态  
  };  
  
  const handleOptionChange = (option: string) => {  
    // 这里假设handleOptionChange是处理单个选项变化的函数  
    // 但在这个例子中，我们不会直接在这里修改selectedValues，因为通常这是由Option组件处理的  
    // 这里只是为了说明如何可能处理选项变化  
  };  
  
  const handleClear = () => {  
    setSelectedValues([]); // 清空选中的值  
    setIsOpen(false); // 可以选择同时关闭下拉框  
  };  
  
  // 假设的Option组件渲染函数（实际中您可能需要一个单独的Option组件）  
  const renderOptions = () => (  
    <div className="dropdown-content">  
      {/* 假设的选项列表 */}  
      {['未付款', '付款中', '部分付款','已付款','已退款','部分退款','已授权'].map((option, index) => (  
        <div key={index} className="dropdown-item" onClick={() => handleOptionChange(option)}>  
          <input  
            type="checkbox"  
           
            onChange={() => {  
              // 这里应该有更复杂的逻辑来处理选中状态  
              // 但为了简化，我们不会在这里直接修改selectedValues  
            }}  
          />  
          {option}  
        </div>  
      ))}  
    </div>  
  );  
  
  return (  
    <div className="dropdown">  
      <button className='dropdown-button' onClick={toggleDropdown}>全部地点</button>  
      {isOpen && renderOptions()}  
    </div>  
  );  
};  
  
export default DropdownState;