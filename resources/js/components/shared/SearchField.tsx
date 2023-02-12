import React, {
    ChangeEvent,
    FC,
    memo,
    MutableRefObject,
    useCallback,
    useRef,
    useState,
} from "react";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";
import { debounce, InputAdornment, TextField } from "@material-ui/core";
import { Icon } from "../../../assets/icons/Icon";
import { SearchIcon } from "../../../assets/icons/Search.icon";
import _ from "lodash";
import Filter1Icon from "@mui/icons-material/Filter1";

type Props = TextFieldProps & {
    placeholder?: string;
};

export type SearchFieldRef = MutableRefObject<Props | undefined>;

export type HandleFilterInputChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
) => void;

export const searchComparator = (search: string, text: string) => {
    const formattedSearchString = _.deburr(search.toLowerCase());
    const formattedText = _.deburr(text.toLowerCase());
    return formattedText.includes(formattedSearchString);
};

export type SearchFieldComparator = (texts: string[]) => boolean;
export const useSearchFieldState = () => {
    const [searchString, setSearchString] = useState<string>("");
    const searchField = useRef<Props>();

    const resetSearchString = () => {
        setSearchString("");
        setInternalState("");
    };

    const debouncer = useCallback(
        debounce((searchValue: string) => {
            setSearchString(searchValue);
        }, 300),
        []
    );
    const handleFilterChange: HandleFilterInputChange = useCallback((event) => {
        const value = event.target ? event.target.value : event.toString();
        debouncer(value);
        setInternalState(value);
    }, []);

    const setInternalState = (str: string) => {
        if (searchField.current) {
            searchField.current!.value = str;
        }
    };

    const compare: SearchFieldComparator = useCallback(
        (texts) => {
            const matches = texts.filter((singleText) => {
                return searchComparator(searchString, singleText ?? "");
            });
            return matches.length > 0;
        },
        [searchString]
    );

    return {
        searchString,
        handleFilterChange,
        compare,
        resetSearchString,
        searchField,
    };
};
export const SearchField: FC<Props> = memo(({ placeholder, ...props }) => {
    return (
        <TextField
            {...props}
            placeholder={placeholder ?? "Search"}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Icon
                            Component={
                                props.type === "number"
                                    ? Filter1Icon
                                    : SearchIcon
                            }
                        />
                    </InputAdornment>
                ),
            }}
        />
    );
});
