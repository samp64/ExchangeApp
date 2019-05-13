import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
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
    const { label, onClick, options, value } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="selectWrapper">
        {<label className="selectLabel">{label}</label>}
    
        <div className={classnames("select")} onClick={() => this.setOpen(true)}>
          <div>{value}</div>
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
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number]
  ),
  options: PropTypes.arrayOf(
    PropTypes.oneOfType( 
      [PropTypes.string, PropTypes.number]
    )
  ),
  placeholder: PropTypes.string,
};


