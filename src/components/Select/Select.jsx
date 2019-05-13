import React from "react";
import classnames from "classnames";
import { func, string, arrayOf, number, oneOfType } from "prop-types";
import "./Select.css";

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setOpen = isOpen => this.setState({ isOpen })

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render () {
    const { label, onClick, options, value, placeholder} = this.props;
    const { isOpen } = this.state;
    return (
      <div className="selectWrapper">
        {<label className="selectLabel">{label}</label>}
    
        <div className={classnames("select")} onClick={() => this.setOpen(true)}>
          <div className={classnames({ placeholder: !value })}>{value || placeholder}</div>
          { 
            isOpen && 
              <div className="options" ref={this.setWrapperRef}>
                {options.map(option => 
                  <div
                    id="option"
                    key={option} 
                    onMouseDown={() => onClick(option)}
                    onMouseUp={() => this.setOpen(false)}
                  >
                    <span>{option}</span>
                  </div> 
                )}
              </div>
          }
        </div>
        
      </div>
    );
  }
}

Select.propTypes = {
  onClick: func.isRequired,
  label: string,
  value: oneOfType(
    [string, number]
  ),
  options: arrayOf(
    oneOfType( 
      [string, number]
    )
  ),
  placeholder: string,
};


