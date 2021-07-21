import "./button.css";
const Button = () => {
    return (
        <button class="btn" type="button" onClick={() => { alert("Done")} }>Select</button>
    );
};

export default Button;