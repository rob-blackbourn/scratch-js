export class UnitIdentifier {
    constructor(domain, authority, system, unit) {
        this.domain = domain
        this.authority = authority
        this.system = system
        this.unit = unit
    }

    equals(other) {
        return this === other || (
            this instanceof UnitIdentifier && 
            this.domain.equals(other.domain) && 
            this.authority.equals(other.authority) && 
            this.system.equals(other.system) && 
            this.unit.equals(other.unit))
    }

    toString() {
        return `domain=${this.domain}, system=${this.system}, authority=${this.authority}, unit=${this.unit}`;
    }
}

export default class UnitConverter extends UnitIdentifier {

    constructor(domain, authority, system, unit, targetConverter, toTarget, fromTarget) {
        super(domain, authority, system, unit);
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
            var index = fromConverters.findIndex(x => x.equals(toConverter))
            if (index !== -1) {
                return { from: fromConverters.slice(0, index), to: toConverters };
            }
            toConverters.push(toConverter);
            toConverter = toConverter.targetConverter;
        }

        return null;
    }
}