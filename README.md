# UD4D Frontend úkol

Zaslané zadání jsem si trochu rozšířil, abych udělal trochu komplexnější řešení a zadání upravil do více dynamické podoby. Každopádně jsem pořád splnil vše co bylo v zadání uvedeno.

## Podoba řešení

* Typescript (react)
* (NOVĚ) - uživatel se nyní může registrovat. Registrace vyžaduje email, heslo a potvrzení hesla. Zde jsou stejné podmínky jako byly v zadání (email obsahuje právě jeden zavináč, může obsahovat pouze malá písmena, bez diakritiky, číslice, pomlčku a tečku, minimální délka před zavináčem musí být alespon 5 znaků, minimální délka hesla musí být 6 znaků). Tyto podmínky jsou tedy kontrolovány při registraci, pokud nejsou splněny, tak není připuštěna registrace. Tím pádem se již následně počítá s tím, že v "databázi" jsou validní hodnoty. 
* Proces registrace je doprovázen vizualizací kroků, které jsou potřeba udělat pro uspěšné registrování.
* Přihláší vyžaduje email a heslo, pokud učet existuje, tak je uživatel přihlášen a je mu zobrazen speciální kontent (pouze pro přihlášené).
* Registrace i přihlašování jsou doprovázeny chybovými hlášeními.
* Pro ukládání dat jsem použil JSON server

### v package.json je start nakonfigurovaný tak, že spustí zároven i json server. Systém je na localhostu:3000 a json server je na localhostu:8000.

#### V projektu jsem nepoužil doporučenou knihovnu Material UI. 
