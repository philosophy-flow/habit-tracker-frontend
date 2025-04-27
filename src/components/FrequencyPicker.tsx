import { FrequencyPickerProps } from "./types";
import FrequencyButton from "./FrequencyButton";

export default function FrequencyPicker({
    updateFrequency,
    frequency,
}: FrequencyPickerProps) {
    return (
        <figure>
            <ul className="flex justify-center">
                <FrequencyButton
                    updateFrequency={updateFrequency}
                    frequency={frequency}
                    day="Sun"
                    label="S"
                />
                <FrequencyButton
                    updateFrequency={updateFrequency}
                    frequency={frequency}
                    day="Mon"
                    label="M"
                />
                <FrequencyButton
                    updateFrequency={updateFrequency}
                    frequency={frequency}
                    day="Tue"
                    label="T"
                />
                <FrequencyButton
                    updateFrequency={updateFrequency}
                    frequency={frequency}
                    day="Wed"
                    label="W"
                />
                <FrequencyButton
                    updateFrequency={updateFrequency}
                    frequency={frequency}
                    day="Thu"
                    label="T"
                />
                <FrequencyButton
                    updateFrequency={updateFrequency}
                    frequency={frequency}
                    day="Fri"
                    label="F"
                />
                <FrequencyButton
                    updateFrequency={updateFrequency}
                    frequency={frequency}
                    day="Sat"
                    label="S"
                />
            </ul>
        </figure>
    );
}
