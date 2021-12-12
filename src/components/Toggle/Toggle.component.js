import React, {useState} from "react";
import VendorService from "../../services/VendorService";
import { useToasts } from "react-toast-notifications";

const Toggle = (props) => {

    const {store_status, text, size = "default",store, offstyle = "btn-danger", onstyle = "btn-success"} = props;
    const { addToast } = useToasts();
    const [checked, setChecked] = useState(store_status)
    const [loading, setLoading] = useState(false)

    async function onChange(e) {
        setLoading(true)
        const response = await VendorService.editVendorStatus(!checked, store)
        if (response.status === 200) {
            setChecked(!checked)
            addToast("Status successfully changed",
                    {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 1500,
                    TransitionState: "exiting",
                });

            setLoading(false)

        } else {
            addToast(response.data.message,
                {
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout: 1500,
                });
            setLoading(false)

        }
    }

    let displayStyle = checked ? onstyle : offstyle;

    return (
        <>
            <label>
        <span className={`${size} switch-wrapper`}>
          <input
              type="checkbox"
              checked={checked}
              disabled={loading}
              onChange={e => onChange(e)}
              value={checked}
              data-toggle="toggle"
          />

          <span className={`${displayStyle} switch`}>
            <span className="switch-handle"/>
          </span>
        </span>
                <span className="switch-label">{text}</span>

            </label>

        </>
    );
}

export default Toggle;