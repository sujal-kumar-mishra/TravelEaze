function invertedCommas(a) {
    if(a && (isNaN(a) || a!==Number(a)) && !a.includes("()")) return "'" + a + "'";
    return a;
}

function nextMonth(a) {
    return (parseInt(a)+1).toString();
}

module.exports = {
    insertCommand : function(Table, Values) {
        var commaSeparator = ", ";
        var sql = "insert into " + Table + " values ";
        sql += "(";
        for(let i=0; i<Values.length; i++) {
            if(i!=0) sql += commaSeparator;
            sql += invertedCommas(Values[i]);
        }
        sql += ")";
        return sql;
    },


    selectCommand : function(Table, Columns=null, Condition=null) {
        var commaSeparator = ", ";
        var sql = "select ";
        if(!Columns) sql += "*";
        else {
            for(let i=0; i<Columns.length; i++) {
                if(i!=0 && i!=Columns.length) sql += commaSeparator;
                sql += Columns[i];
            }
        }
        sql += " from " + Table;
        if(Condition) sql += " where " + Condition;
        return sql;
    },


    deleteCommand : function(Table, Condition) {
        return ("delete from " + Table + " where " + Condition);
    },


    isAdmin : function(email, password) {
        return email==="travelagency@gmail.com" && password==="123";
    },

    
    updateCommand : function(Table, Columns, Values, ConditionColumns, ConditionValues) {
        var sql = "update " + Table + " set ";
        for(let i=0; i<Columns.length; i++) {
            if(i!=0) sql += ", ";
            sql += Columns[i] + "=" + invertedCommas(Values[i]);
        }
        sql += " where ";
        for(let i=0; i<ConditionColumns.length; i++) {
            if(i!=0) sql += " and ";
            sql += ConditionColumns[i] + "=" + invertedCommas(ConditionValues[i]) + " ";
        }
        return sql;
    },


    getDateHelper : function(result, date_type) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        result.forEach(element => {
            date_type.forEach(i => {
                if(element[i]==null) return;
                element[i] = months[element[i].getMonth()] + " " + element[i].getDate() 
                                        + ", " + element[i].getFullYear();
            });
        });
        return result;
    },


    getShortenedDate : function(result, date_type) {
        // 2020-12-09T18:30:00.000Z
        result.forEach(element => {
            date_type.forEach(i => {
                if(element[i]==null) return;
                element[i] = (element[i].getFullYear()).toString().padStart(4,0) + "-" 
                                + (nextMonth(element[i].getMonth())).toString().padStart(2,0) + "-" 
                                + (element[i].getDate()).toString().padStart(2,0);
            });
        });
        return result;
    }

}