export class UnitIdentifier {

    constructor(domain, authority, system, name) {
        this._domain = domain;
        this._authority = authority;
        this._system = system;
        this._name = name;
    }

    get domain() {
        return this._domain;
    }

    get authority() {
        return this._authority;
    }

    get system() {
        return this._system;
    }

    get name() {
        return this._name;
    }
}

export class Unit extends UnitIdentifier {

    constructor(domain, authority, system, name, symbol) {
        super(domain, authority, system, name);
        this._symbol = symbol;
    }

    get symbol() {
        return this._symbol;
    }
}

export default class UnitConverter extends Unit {

    constructor(domain, authority, system, name, symbol, targetConverter, toTarget, fromTarget) {
        super(domain, authority, system, name, symbol);
        this._targetConverter = targetConverter;
        this._toTarget = toTarget;
        this._fromTarget = fromTarget;
    }

    get targetConverter() {
        return this._targetConverter;
    }

    get toTarget() {
        return this._toTarget;
    }

    get fromTarget() {
        return this._fromTarget;
    }

    toString() {
        return "domain=" + this._domain + ",system=" + this._system + ",authority=" + this._authority + ",symbol=" + this._symbol + ",name=" + this._name;
    }

    convert(value, to) {

        if (this === to) {
            return value;
        }

        var converters = UnitConverter.prepareConverters(this, to);

        for (let converter of converters.from) {
            if (converter.toTarget) {
                console.log(`Converting ${value} to ${converter.toString()}`);
                value = converter.toTarget(value);
            }
        }

        for (let converter of converters.to) {
            if (converter.fromTarget) {
                console.log(`Converting ${value} from ${converter.toString()}`);
                value = converter.fromTarget(value);
            }
        }

        return value;
    }

    static prepareConverters(fromConverter, toConverter) {

        var fromConverters = [];
        while (fromConverter) {
            fromConverters.push(fromConverter);
            fromConverter = fromConverter.targetConverter;
        }

        var toConverters = [];
        while (toConverter) {
            var index = fromConverters.indexOf(toConverter);
            if (index !== -1) {
                return { from: fromConverters.slice(0, index), to: toConverters };
            }
            toConverters.push(toConverter);
            toConverter = toConverter.targetConverter;
        }

        return null;
    }
}